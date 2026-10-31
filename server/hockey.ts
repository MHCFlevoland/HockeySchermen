import crypto from "node:crypto";
import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

const BASE = "https://app.hockeyweerelt.nl";
const AUTH_FILE = path.join(process.cwd(), "storage", "hockey-token.json");
type Auth = { uuid: string; token: string };
let authPromise: Promise<Auth> | undefined;
let lastRequest = 0;
let queue: Promise<unknown> = Promise.resolve();
const clean = (s: string) => s.replace(/[^a-zA-Z0-9\-/=]+/g, "");

async function getAuth(): Promise<Auth> {
  if (!authPromise) authPromise = (async () => {
    try {
      const saved = JSON.parse(await fs.readFile(AUTH_FILE, "utf8")) as Auth;
      if (saved.uuid && saved.token) return saved;
    } catch { /* first registration */ }
    const uuid = randomUUID();
    const res = await fetch(`${BASE}/device/register`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uuid, os: "Web" }), cache: "no-store",
    });
    if (!res.ok) throw new Error(`Device registration failed: ${res.status}`);
    const data = await res.json() as { token?: string };
    if (!data.token) throw new Error("Device registration returned no token");
    await fs.mkdir(path.dirname(AUTH_FILE), { recursive: true });
    await fs.writeFile(AUTH_FILE, JSON.stringify({ uuid, token: data.token }), { mode: 0o600 });
    return { uuid, token: data.token };
  })().catch(err => { authPromise = undefined; throw err; });
  return authPromise;
}

async function requestFacility(date: string, facilityId: string): Promise<unknown> {
  if (!/^\d+$/.test(facilityId)) throw new Error("Invalid FACILITY_ID");
  const next = new Date(`${date}T12:00:00Z`);
  next.setUTCDate(next.getUTCDate() + 1);
  const end = next.toISOString().slice(0, 10);
  const route = `/facilities/${facilityId}/matches`;
  const params: Record<string, string> = { "filter[dateStart]": date, "filter[dateEnd]": end };
  return signedGet(route, params);
}

async function signedGet(route: string, params: Record<string, string> = {}): Promise<unknown> {
  const auth = await getAuth();
  const timestamp = Math.floor(Date.now() / 1000);
  const signatureInput = `${timestamp}${route.replace(/[^a-zA-Z0-9\-/]+/g, "")}${Object.entries(params).map(([k,v]) => `${clean(k)}=${clean(v)}`).join("")}${auth.uuid.split("").reverse().join("")}`;
  const signature = crypto.createHash("sha1").update(signatureInput).digest("hex");
  const url = new URL(BASE + route);
  Object.entries(params).forEach(([k,v]) => url.searchParams.set(k,v));
  const res = await fetch(url, { headers: {
    Accept: "application/json", "X-HAPI-Authorization": auth.token,
    "X-HAPI-Signature": signature, "X-HAPI-Timestamp": String(timestamp), "X-HAPI-Version": "7",
  }, cache: "no-store" });
  if (res.status === 401) {
    authPromise = undefined;
    await fs.rm(AUTH_FILE, { force: true });
    throw new Error("Upstream authentication expired; retry shortly");
  }
  if (!res.ok) {
    if (res.status === 429) throw new Error("Upstream rate limit reached");
    throw new Error(`Upstream request failed: ${res.status}`);
  }
  return res.json();
}

export function getFacilityMatches(date: string, facilityId: string): Promise<unknown> {
  const task = queue.catch(() => {}).then(async () => {
    const delay = Math.max(0, 500 - (Date.now() - lastRequest));
    if (delay) await new Promise(resolve => setTimeout(resolve, delay));
    lastRequest = Date.now();
    return requestFacility(date, facilityId);
  });
  queue = task;
  return task;
}

export function getFacilities(): Promise<unknown> {
  const task = queue.catch(() => {}).then(async () => {
    const delay = Math.max(0, 500 - (Date.now() - lastRequest));
    if (delay) await new Promise(resolve => setTimeout(resolve, delay));
    lastRequest = Date.now();
    return signedGet("/facilities");
  });
  queue = task;
  return task;
}

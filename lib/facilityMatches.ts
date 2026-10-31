export type DisplayMatch = {
  id: string; datetime: string; field: string; status: string;
  home_team_name: string; away_team_name: string;
  home_score: number | null; away_score: number | null; is_live: boolean;
};
function obj(v: unknown): Record<string, any> { return v && typeof v === "object" ? v as Record<string, any> : {}; }
export function normalizeMatches(payload: unknown): DisplayMatch[] {
  const root = obj(payload);
  const data = root.data ?? payload;
  const entries = Array.isArray(data) ? data : (obj(data).matches ?? obj(data).items ?? []);
  if (!Array.isArray(entries)) throw new Error("Unexpected facility response format");
  return entries.map((item: unknown) => {
    const m = obj(item); const a = obj(m.attributes);
    const home = obj(m.home ?? m.home_team ?? a.home_team ?? m.homeTeam);
    const away = obj(m.away ?? m.away_team ?? a.away_team ?? m.awayTeam);
    const field = m.field ?? a.field ?? m.field_name ?? a.field_name;
    const score = obj(m.score ?? a.score ?? m.scores ?? a.scores);
    const scoreNumber = (value: unknown): number | null => value !== null && value !== undefined && value !== "" && Number.isFinite(Number(value)) ? Number(value) : null;
    const status = String(m.status ?? a.status ?? "");
    const isLive = m.is_live === true || a.is_live === true || m.isLive === true || /^(live|in_progress|in progress|playing|started|bezig|lopende)$/i.test(status);
    return {
      id: String(m.id ?? a.id ?? ""),
      datetime: String(m.date ?? m.datetime ?? a.datetime ?? m.start_time ?? a.start_time ?? ""),
      field: String(typeof field === "object" ? (field.name ?? field.label ?? "") : (field ?? "")),
      status,
      is_live: isLive,
      home_score: scoreNumber(m.home_score ?? a.home_score ?? m.homeScore ?? score.home ?? score.home_score ?? score.homeTeam),
      away_score: scoreNumber(m.away_score ?? a.away_score ?? m.awayScore ?? score.away ?? score.away_score ?? score.awayTeam),
      home_team_name: String(home.name ?? m.home_team_name ?? a.home_team_name ?? ""),
      away_team_name: String(away.name ?? m.away_team_name ?? a.away_team_name ?? ""),
    };
  }).filter(m => m.id && m.datetime);
}
export async function fetchFacilityMatches(facilityId: string): Promise<DisplayMatch[]> {
  const response = await fetch(`/api/matches?facilityId=${encodeURIComponent(facilityId)}`, { cache: "no-store" });
  if (!response.ok) throw new Error(`Failed to load matches (${response.status})`);
  return normalizeMatches(await response.json());
}

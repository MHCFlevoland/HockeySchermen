"use client";

import dynamic from "next/dynamic";
import { Button, Label, Select, TextInput, Tooltip } from "flowbite-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import { useEffectOnce, useLocalStorage } from "usehooks-ts";
import { decrypt, encrypt } from "@/lib/crypt";
import Code from "@/components/Code";

function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preConfig = searchParams.get("config");
  // create state for clubs
  const [facilityId, setFacilityId] = useLocalStorage("facilityId", "141");
  const [fieldNames, setFieldNames] = useLocalStorage(
    "fieldNames",
    [] as string[]
  );

  type Facility = { id: number; name: string; address?: { city?: string; street_address?: string } };
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [facilitiesError, setFacilitiesError] = useState("");
  const [loadingFacilities, setLoadingFacilities] = useState(true);
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/facilities", { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((payload: { data?: Facility[] }) => {
        if (!Array.isArray(payload.data)) throw new Error("Unexpected facilities response");
        setFacilities(payload.data.slice().sort((a, b) => a.name.localeCompare(b.name, "nl")));
      })
      .catch((error) => {
        if (!controller.signal.aborted) setFacilitiesError("Locaties ophalen mislukt. Voer eventueel handmatig een ID in.");
      })
      .finally(() => { if (!controller.signal.aborted) setLoadingFacilities(false); });
    return () => controller.abort();
  }, []);

  const [preConfigUrl, setPreConfigUrl] = useState("");
  useEffectOnce(() => {
    if (preConfig !== null) {
      const config = JSON.parse(decrypt(preConfig));
      window.localStorage.clear();
      setFacilityId(String(config.facilityId ?? "141"));
      setFieldNames(config.fieldNames);
      router.push("/");
    }
    if (typeof window !== "undefined") {
    }
  });
  const createPreConfigUrl = () => {
    const url = new URL(window.location.origin + "/setup");
    url.searchParams.append(
      "config",
      encrypt(JSON.stringify({ facilityId, fieldNames }))
    );
    setPreConfigUrl(url.toString());
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-semibold mb-4"> Setup Config</h1>
      <div className="flex max-w-md flex-col gap-4 w-3/4">
        <div>
          <Label htmlFor="facilityId" value="Facility ID (HockeyWeerelt)" />
          <Select
            id="facilitySelect"
            value={facilities.some((facility) => String(facility.id) === facilityId) ? facilityId : ""}
            onChange={(e) => { if (e.target.value) setFacilityId(e.target.value); }}
            disabled={loadingFacilities || facilities.length === 0}
          >
            <option value="">{loadingFacilities ? "Locaties laden..." : "Selecteer een locatie (of voer ID in)"}</option>
            {facilities.map((facility) => (
              <option key={facility.id} value={String(facility.id)}>
                {facility.name}{facility.address?.city ? ` — ${facility.address.city}` : ""} (#{facility.id})
              </option>
            ))}
          </Select>
          {facilitiesError && <p className="text-sm text-red-500">{facilitiesError}</p>}
          <div className="mt-2">
            <Label htmlFor="facilityId" value="Of voer Facility ID handmatig in" />
            <TextInput id="facilityId" type="number" min="1" value={facilityId} onChange={(e) => setFacilityId(e.target.value)} placeholder="141" required />
          </div>
        </div>
        {/* Vield Names List */}
        <div>
          <div className="mb-2 block">
            <Tooltip content="Tooltip content">
              <Label htmlFor="fieldName" value="Your email" />
            </Tooltip>
          </div>
          <div className="flex gap-1 w-full">
            <TextInput
              id="fieldName"
              placeholder="Veld Naam"
              required
              shadow
              type="text"
              className=" w-full"
            />
            <Button
              className=" min-w-fit "
              onClick={() => {
                const fieldName = document.getElementById(
                  "fieldName"
                ) as HTMLInputElement;
                setFieldNames([...fieldNames, fieldName.value]);
              }}
            >
              Add
            </Button>
          </div>
          <div>
            <Suspense fallback={<p>Loading...</p>}>
              {fieldNames.map((fieldName, i) => {
                return (
                  <div
                    key={"fieldNameDiv-" + i}
                    className="flex gap-1 w-full my-4 items-center h-full"
                  >
                    <p className=" w-full">{fieldName}</p>
                    <Button
                      className=" min-w-fit"
                      color="red"
                      onClick={() => {
                        setFieldNames(
                          fieldNames.filter((name) => name !== fieldName)
                        );
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                );
              })}
            </Suspense>
          </div>
        </div>
        <div className="flex gap-1 w-full">
          <Button className="w-1/2" onClick={() => router.push("/")}>
            Open Scherm
          </Button>
          <Button color="green" className="w-1/2" onClick={createPreConfigUrl}>
            Save Config als Link.
          </Button>
        </div>
      </div>
      {preConfigUrl !== "" ? (
        <Code dollarDisplay="">
          <span className="text-sm text-yellow-500 mt-4">{preConfigUrl}</span>
        </Code>
      ) : null}
    </div>
  );
}

export default dynamic(() => Promise.resolve(Page), { ssr: false });

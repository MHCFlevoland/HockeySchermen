"use client";
import { useEffect, useState } from "react";
import Fields from "./Fields";
import { fetchFacilityMatches, type DisplayMatch } from "@/lib/facilityMatches";
export default function FacilityMatches({ fieldNames, facilityId }: { fieldNames: string[]; facilityId: string; clubId?: string; clubLocation?: string }) {
  const [matches, setMatches] = useState<DisplayMatch[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    let active = true;
    async function refresh() {
      try {
        const result = await fetchFacilityMatches(facilityId);
        if (active) { setMatches(result); setError(""); }
      } catch (e) { if (active) setError(e instanceof Error ? e.message : "Ophalen mislukt"); }
    }
    void refresh();
    const interval = setInterval(() => void refresh(), 180_000);
    return () => { active = false; clearInterval(interval); };
  }, [facilityId]);
  const fields = Array.from(new Set(matches.map(m => m.field).filter(Boolean)));
  const hasAssignments = fields.length > 0;
  const displayFields = hasAssignments ? (fieldNames.length ? fieldNames : fields) : ["Wedstrijden"];
  return <div className="flex flex-col max-h-full justify-center w-full m-8">
    {error && <p role="alert" className="text-red-600">Wedstrijden konden niet worden bijgewerkt: {error}</p>}
    {displayFields.map(name => <Fields key={name} fieldName={name} matches={matches} showAll={!hasAssignments} />)}
  </div>;
}

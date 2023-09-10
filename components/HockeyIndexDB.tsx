"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect } from "react";
import Fields from "./Fields";
import { initDB } from "react-indexed-db-hook";
import { useEffectOnce, useLocalStorage } from "usehooks-ts";
import DBConfig from "@/lib/DBConfig";
import { useIndexedDB } from "react-indexed-db-hook";
import { getClubTeams, getTeamMatchesUpcoming } from "@/lib/HockeyApi";
import { get } from "http";

initDB(DBConfig);

function HockeyIndexDB({
  fieldNames,
  clubId,
}: {
  fieldNames: string[];
  clubId: string;
}) {
  const [clubTeams, setClubTeams] = useLocalStorage(
    "clubTeams",
    [] as string[]
  );
  const { add, clear, getAll } = useIndexedDB("matches");
  const [matches, setMatches] = useLocalStorage("matches", [] as any[]);

  useEffectOnce(() => {
    clear();
    getClubTeams(clubId).then((data) => {
      let teams = [] as string[];
      data?.forEach((team: { id: string }) => {
        teams = [...teams, team.id];
        getTeamMatchesUpcoming(team.id).then((data) => {
          data?.forEach((match: any) => {
            if (match.home_team.id !== team.id) {
              return;
            }
            add({
              id: match.id,
              datetime: match.datetime,
              field: match.field,
              home_team_name: match.home_team.name,
              home_team_logo: match.home_team.logo,
              away_team_name: match.away_team.name,
              away_team_logo: match.away_team.logo,
            });
          });
        });
      });
      setClubTeams(teams);
    });
  });

  useEffect(() => {
    getAll().then((matches) => {
      setMatches(matches);
    });
  }, [clubTeams]);

  return (
    <div className="flex flex-col max-h-full justify-center w-full m-8">
      <Suspense fallback={<div>Loading...</div>}>
        {fieldNames.map((fieldName, i) => {
          return <Fields key={i} fieldName={fieldName} matches={matches} />;
        })}
      </Suspense>
    </div>
  );
}

export default dynamic(() => Promise.resolve(HockeyIndexDB), { ssr: false });

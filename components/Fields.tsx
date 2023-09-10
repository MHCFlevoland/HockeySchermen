"use client";

import { useState } from "react";
import { useIndexedDB } from "react-indexed-db-hook";
import { useEffectOnce } from "usehooks-ts";

function removePastDates(objects: any[]) {
  const now = new Date();
  const utcMin = new Date(now.toISOString());
  utcMin.setMinutes(utcMin.getMinutes() - 70);
  const utcMax = new Date(now.toISOString());
  utcMax.setHours(utcMax.getHours() + 10);
  return objects.filter(
    (obj) => new Date(obj.datetime) > utcMin && new Date(obj.datetime) < utcMax
  );
}

export default function Fields({
  fieldName,
  matches,
}: {
  fieldName: string;
  matches: any[];
}) {
  matches = matches.filter((match) => match.field == fieldName);
  console.log(matches);
  matches.sort((a, b) => {
    return new Date(a.datetime) > new Date(b.datetime) ? 1 : -1;
  });
  console.log(matches);
  const futureEvents = removePastDates(matches).slice(0, 3);
  console.log(futureEvents);

  return (
    <div id={fieldName} className="w-full h-fit mb-8">
      <h1 className="border-b-4 border-blue-500 items-center px-6 text-4xl font-semibold">
        {fieldName}
      </h1>
      {futureEvents.length == 0 ? (
        <div className="text-2xl font-semibold text-center w-full pt-2">
          Geen Wedstrijd
        </div>
      ) : (
        futureEvents.map((match, i) => {
          return (
            <div
              key={fieldName + "-" + i}
              className="grid grid-cols-4 gap-2 mt-2 pt-2"
            >
              <div className="col-span-1 flex flex-col justify-center">
                <div className="text-2xl text-center text-blue-700 font-bold">
                  {new Date(match.datetime).toLocaleTimeString()}
                </div>
              </div>
              <div className="col-span-3 flex justify-center">
                <div className="text-2xl font-semibold">
                  {match.home_team_name}
                </div>
                <div className="mx-4 text-2xl font-semibold">-</div>
                <div className="text-2xl font-semibold">
                  {match.away_team_name}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

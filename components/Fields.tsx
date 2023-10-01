"use client";

import { RemovePastDates } from "@/lib/RemovePastDates";

export default function Fields({
  fieldName,
  matches,
}: {
  fieldName: string;
  matches: any[];
}) {
  matches = matches.filter((match) => match.field == fieldName);
  matches.sort((a, b) => {
    return new Date(a.datetime) > new Date(b.datetime) ? 1 : -1;
  });
  const futureEvents = RemovePastDates(matches).slice(0, 3);

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
                  {new Date(match.datetime).toLocaleString("nl-NL", {
                    timeZone: "Europe/Amsterdam",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
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

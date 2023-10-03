"use client";

import { getCalendar } from "@/lib/Webscraper";
import { useState } from "react";
import { useEffectOnce } from "usehooks-ts";

export default function Calendar() {
  const [calendar, setCalendar] = useState([] as any[]);

  useEffectOnce(() => {
    getCalendar().then((calendar) => {
      console.log(calendar.slice(0, 3));
      setCalendar(calendar.slice(0, 3));
    });
  });

  return (
    <div className="w-full h-fit mb-8">
      <h1 className="border-b-4 border-blue-500 items-center px-6 text-4xl font-semibold">
        Agenda
      </h1>
      <div id="calendar" className="grid gap-2 mt-2">
        {calendar.map((event) => (
          <div
            className="flex flex-col justify-center items-center "
            key={event.title}
          >
            <h1 className="text-2xl font-semibold">{event.title}</h1>
            <h1 className="text-xl font-semibold">{event.day}</h1>
            <h1 className="text-xl font-semibold">{event.time}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

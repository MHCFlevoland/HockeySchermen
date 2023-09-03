import React, { useState } from "react";

export default function Clock() {
  // For digital clock
  let time = new Date().toLocaleString("nl-NL", {
    timeZone: "Europe/Amsterdam",
    hour: "2-digit",
    minute: "2-digit",
  });
  let [ctime, setCTime] = useState() as any;
  const updateTime = () => {
    time = new Date().toLocaleString("nl-NL", {
      timeZone: "Europe/Amsterdam",
      hour: "2-digit",
      minute: "2-digit",
    });
    setCTime(time);
  };
  setInterval(updateTime, 1000);
  return <>{ctime}</>;
}

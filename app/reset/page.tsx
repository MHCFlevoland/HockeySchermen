"use client";

import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";

export default function Reset() {
  const router = useRouter();

  const resetConfig = () => {
    console.log("Resetting config");
    localStorage.clear();
    indexedDB.deleteDatabase("hockeySchema");
    router.push("/setup");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-semibold mb-4"> Reset Config </h1>
      <Button onClick={() => resetConfig()} color="red">
        Reset Config
      </Button>
    </div>
  );
}

"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { IndexedDB } from "react-indexed-db-hook";
import Fields from "./Fields";
import { initDB } from "react-indexed-db-hook";
import { useEffectOnce } from "usehooks-ts";
import DBConfig from "@/lib/DBConfig";

function HockeyIndexDB({ fieldNames }: { fieldNames: string[] }) {
  useEffectOnce(() => {
    initDB(DBConfig);
  });
  return (
    <div className="flex flex-col max-h-full justify-center w-full m-8">
      <Suspense fallback={<div>Loading...</div>}>
        {fieldNames.map((fieldName, i) => {
          return <Fields key={i} fieldName={fieldName} />;
        })}
      </Suspense>
    </div>
  );
}

export default dynamic(() => Promise.resolve(HockeyIndexDB), { ssr: false });

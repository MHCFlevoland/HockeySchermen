"use client";

import dynamic from "next/dynamic";
import Calendar from "@/components/Calendar";
import DefaultNavbar from "@/components/DefaultNavbar";
import Fields from "@/components/Fields";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { useEffectOnce, useLocalStorage } from "usehooks-ts";
import { getClubTeams } from "@/lib/HockeyApi";
import { DBConfig } from "@/lib/DBConfig";

//@ts-ignore
const initDB = dynamic(() => import("react-indexed-db-hook"), { ssr: false });

function Home() {
  const router = useRouter();
  const [clubId, setClubId] = useLocalStorage("clubId", "");
  useEffectOnce(() => {
    if (clubId == "") {
      router.push("/setup");
    }
    if (typeof window !== "undefined") {
      // @ts-ignore
      initDB(DBConfig);
    }
    if (clubName == "") {
      getClubTeams(clubId).then((teams) => {
        setClubName(teams[0].club_name);
        setClubLogo(teams[0].logo);
      });
    }
  });
  const [clubLogo, setClubLogo] = useLocalStorage("clubLogo", "");
  const [clubName, setClubName] = useLocalStorage("clubName", "");
  // const [clubHockeyTypes, setClubHockeyTypes] = useLocalStorage(
  //   "clubHockeyTypes",
  //   []
  // );
  const [fieldNames, setFieldNames] = useLocalStorage(
    "fieldNames",
    [] as string[]
  );

  return (
    <>
      <DefaultNavbar imageURL={clubLogo} clubName={clubName} />
      <div className="grid grid-cols-7 gap-2 h-full">
        <section className="h-full flex justify-end col-span-5">
          <div className="flex flex-col max-h-full justify-center w-full m-8">
            <Suspense fallback={<div>Loading...</div>}>
              {fieldNames.map((fieldName, i) => {
                return <Fields key={i} fieldName={fieldName} />;
              })}
            </Suspense>
          </div>
        </section>
        <section className="h-full flex justify-end col-span-2">
          <div className="flex flex-col max-h-full justify-center w-full m-8">
            <Calendar />
          </div>
        </section>
      </div>
    </>
  );
}

export default dynamic(() => Promise.resolve(Home), { ssr: false });

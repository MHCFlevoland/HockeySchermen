"use client";

import dynamic from "next/dynamic";
import Calendar from "@/components/Calendar";
import DefaultNavbar from "@/components/DefaultNavbar";
import { useRouter } from "next/navigation";
import { useEffectOnce, useLocalStorage } from "usehooks-ts";
import { getClubTeams } from "@/lib/HockeyApi";

const HockeyIndexDB = dynamic(() => import("@/components/HockeyIndexDB"), {
  loading: () => <p>Loading...</p>,
});

function Home() {
  const router = useRouter();
  const [clubId, setClubId] = useLocalStorage("clubId", "");
  useEffectOnce(() => {
    if (clubId == "") {
      router.push("/setup");
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
          <HockeyIndexDB fieldNames={fieldNames} />
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

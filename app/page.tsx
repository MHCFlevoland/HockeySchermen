"use client";

import dynamic from "next/dynamic";
// import Calendar from "@/components/Calendar";
// import DefaultNavbar from "@/components/DefaultNavbar";
import { useEffectOnce, useLocalStorage } from "usehooks-ts";
import { getClubInfo } from "@/lib/HockeyApi";

const HockeyIndexDB = dynamic(() => import("@/components/HockeyIndexDB"), {
  loading: () => <div></div>,
});

function Home() {
  const [clubId] = useLocalStorage("clubId", "");
  if (clubId == "") {
    window.location.href = "/setup";
  }
  useEffectOnce(() => {
    if (clubName == "" || clubName == undefined) {
      getClubInfo(clubId).then((clubInfo) => {
        setClubName(clubInfo.name);
        setClubLogo(clubInfo.logo);
      });
    }
  });
  const [clubLogo, setClubLogo] = useLocalStorage("clubLogo", "");
  const [clubName, setClubName] = useLocalStorage("clubName", "");
  const [fieldNames] = useLocalStorage("fieldNames", [] as string[]);
  const refresh = () => {
    window.location.reload();
  };
  setTimeout(refresh, 50 * 60 * 1000);

  return (
    <>
      {/* <DefaultNavbar imageURL={clubLogo} clubName={clubName} /> */}
      <div className="grid grid-cols-7 gap-2 h-full">
        <section className="h-full flex justify-end col-span-5">
          <HockeyIndexDB fieldNames={fieldNames} clubId={clubId} />
        </section>
        {/* <section className="h-full flex justify-end col-span-2">
          <div className="flex flex-col max-h-full justify-center w-full m-8">
            <Calendar />
          </div>
        </section> */}
      </div>
    </>
  );
}

export default dynamic(() => Promise.resolve(Home), { ssr: false });

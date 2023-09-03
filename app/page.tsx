"use client";
import Calendar from "@/components/Calendar";
import DefaultNavbar from "@/components/DefaultNavbar";
import Fields from "@/components/Fields";
import { useRouter } from "next/navigation";
import { useEffectOnce, useLocalStorage } from "usehooks-ts";

export default function Home() {
  const router = useRouter();
  const [clubId, setClubId] = useLocalStorage("clubId", -1);
  useEffectOnce(() => {
    if (clubId == -1) {
      router.push("/setup");
    }
  });
  const [clubLogo, setClubLogo] = useLocalStorage("clubLogo", "");
  const [clubName, setClubName] = useLocalStorage("clubName", "");
  const [clubHockeyTypes, setClubHockeyTypes] = useLocalStorage(
    "clubHockeyTypes",
    []
  );

  return (
    <>
      <DefaultNavbar imageURL={clubLogo} clubName={clubName} />
      <div className="grid grid-cols-7 gap-2 h-full">
        <section className="h-full flex justify-end col-span-5">
          <div className="flex flex-col max-h-full justify-center w-full m-8">
            <Fields />
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

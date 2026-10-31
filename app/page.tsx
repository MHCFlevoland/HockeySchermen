"use client";

import dynamic from "next/dynamic";
// import DefaultNavbar from "@/components/DefaultNavbar";
import Calendar from "@/components/Calendar";
import News from "@/components/News";

import { useLocalStorage } from "usehooks-ts";

const FacilityMatches = dynamic(() => import("@/components/FacilityMatches"), {
	loading: () => <div></div>,
});

function Home() {
		const [facilityId] = useLocalStorage("facilityId", "141");
				const [fieldNames] = useLocalStorage("fieldNames", [] as string[]);
	const refresh = () => {
		window.location.reload();
	};
	// Match data refreshes in FacilityMatches every 3 minutes.
	// Keep the screen mounted instead of reloading the whole page.

	return (
		<>
			{/* <DefaultNavbar imageURL={clubLogo} clubName={clubName} /> */}
			<div className="flex flex-col h-full">
				<div className="grow grid grid-cols-7 gap-2 h-full">
					<section className="h-full flex justify-end col-span-5">
						<FacilityMatches
							fieldNames={fieldNames}
							facilityId={facilityId}
																				/>
					</section>
					<section className="h-full flex justify-end col-span-2">
						<div className="flex flex-col max-h-full justify-center w-full m-8">
							<News />
							<Calendar />
						</div>
					</section>
				</div>
				<iframe
					src="https://sponsors.mhcflevoland.nl/?scroll=1"
					style={{ width: "100%", height: "110px", border: "none" }}
				></iframe>
			</div>
		</>
	);
}

export default dynamic(() => Promise.resolve(Home), { ssr: false });

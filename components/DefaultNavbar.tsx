"use client";
import Clock from "./Clock";

export default function DefaultNavbar({
  imageURL,
  clubName,
}: {
  imageURL: string;
  clubName: string;
}) {
  return (
    <nav className="h-16 border-b-4 items-center px-6 text-xl bg-white">
      <div className="flex justify-between h-full">
        <div className="flex justify-around">
          <img
            src={imageURL == "" ? "./favicon.ico" : imageURL}
            alt={clubName}
            className="clubLogo"
          />
        </div>
        <div className="h-full flex justify-center items-center align-middle">
          {/* Time now */}
          <strong>
            <Clock />
          </strong>
        </div>
      </div>
    </nav>
  );
}

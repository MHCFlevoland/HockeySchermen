"use client";

import dynamic from "next/dynamic";
import { getClubs } from "@/lib/HockeyApi";
import {
  Button,
  Checkbox,
  Label,
  Select,
  TextInput,
  Tooltip,
} from "flowbite-react";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { useEffectOnce, useLocalStorage } from "usehooks-ts";

function Page() {
  const router = useRouter();
  // create state for clubs
  const [clubs, setClubs] = useState([]) as any[];
  const [clubId, setClubId] = useLocalStorage("clubId", "");
  const [fieldNames, setFieldNames] = useLocalStorage(
    "fieldNames",
    [] as string[]
  );

  useEffectOnce(() => {
    if (typeof window !== "undefined") {
      getClubs().then((clubs) => {
        setClubs(clubs);
      });
    }
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-semibold mb-4"> Setup Config</h1>
      <div className="flex max-w-md flex-col gap-4 w-3/4">
        {/* ClubSelector */}
        <div>
          <div className="max-w-md" id="select">
            <div className="mb-2 block">
              <Label htmlFor="clubs" value="Select je club" />
            </div>
            <Select
              id="clubs"
              value={clubId}
              required
              onChange={(e) => setClubId(e.target.value)}
            >
              <option value="" disabled>
                Selecteer een Hockey Club
              </option>
              {clubs.map((club: any, i: number) => {
                if (club.type !== "CLUB") {
                  return;
                }
                return (
                  <option key={"clubs-" + i} value={club.id}>
                    {club.name}
                  </option>
                );
              })}
            </Select>
          </div>
        </div>
        {/* Vield Names List */}
        <div>
          <div className="mb-2 block">
            <Tooltip content="Tooltip content">
              <Label htmlFor="fieldName" value="Your email" />
            </Tooltip>
          </div>
          <div className="flex gap-1 w-full">
            <TextInput
              id="fieldName"
              placeholder="Veld Naam"
              required
              shadow
              type="text"
              className=" w-full"
            />
            <Button
              className=" min-w-fit "
              onClick={() => {
                const fieldName = document.getElementById(
                  "fieldName"
                ) as HTMLInputElement;
                setFieldNames([...fieldNames, fieldName.value]);
              }}
            >
              Add
            </Button>
          </div>
          <div>
            <Suspense fallback={<p>Loading...</p>}>
              {fieldNames.map((fieldName, i) => {
                return (
                  <div
                    key={"fieldNameDiv-" + i}
                    className="flex gap-1 w-full my-4 items-center h-full"
                  >
                    <p className=" w-full">{fieldName}</p>
                    <Button
                      className=" min-w-fit"
                      color="red"
                      onClick={() => {
                        setFieldNames(
                          fieldNames.filter((name) => name !== fieldName)
                        );
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                );
              })}
            </Suspense>
          </div>
        </div>
        <div className="flex gap-1 w-full">
          <Button className="w-1/2" onClick={() => router.push("/")}>
            Open Scherm
          </Button>
          <Button color="green" className="w-1/2" onClick={() => {}}>
            Save Config als Link.
          </Button>
        </div>
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Page), { ssr: false });

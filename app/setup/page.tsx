"use client";

import { getClubs, registerDevice } from "@/lib/HockeyApi";
import { Button, Checkbox, Label, Select, TextInput } from "flowbite-react";

export default function Page() {
  if (typeof window !== "undefined") {
    if (!localStorage.getItem("hockeyAPIKey")) {
      registerDevice();
    }
    if (
      localStorage.getItem("hockeyAPIKey") &&
      localStorage.getItem("device_id")
    ) {
      getClubs();
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form className="flex max-w-md flex-col gap-4 w-3/4">
        <div>
          <div className="max-w-md" id="select">
            <div className="mb-2 block">
              <Label htmlFor="countries" value="Select your country" />
            </div>
            <Select id="countries" required>
              <option>United States</option>
              <option>Canada</option>
              <option>France</option>
              <option>Germany</option>
            </Select>
          </div>
          <div className="mb-2 block">
            <Label htmlFor="email2" value="Your email" />
          </div>
          <TextInput
            id="email2"
            placeholder="name@flowbite.com"
            required
            shadow
            type="email"
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password2" value="Your password" />
          </div>
          <TextInput id="password2" required shadow type="password" />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="repeat-password" value="Repeat password" />
          </div>
          <TextInput id="repeat-password" required shadow type="password" />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="agree" />
          <Label className="flex" htmlFor="agree">
            <p>I agree with the </p>
            {/* <LinkComponent
            className="text-cyan-600 hover:underline dark:text-cyan-500"
            href="/forms"
          >
            <p>terms and conditions</p>
          </LinkComponent> */}
          </Label>
        </div>
        <Button type="submit">Register new account</Button>
      </form>
    </div>
  );
}

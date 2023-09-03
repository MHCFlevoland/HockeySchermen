import { v4 as uuidv4 } from "uuid";
import sha1 from "sha1";

// proxy de api door corsproxy.io om de cors errors te voorkomen en de api te kunnen gebruiken vanuit de browser.
// mode: no-cors werkt niet met de hockey.nl api, omdat je een leege response krijgt.

function getProxyUrl(slug: string): string {
  return (
    "https://corsproxy.io/?" +
    encodeURIComponent("https://api.hockey.nl" + slug)
  );
}

function signURL(url: string, array: any[]): string {
  array.sort();
  const apikey = localStorage.getItem("hockeyAPIKey") as string;
  const sign = array + (localStorage.getItem("device_id") as string);
  console.log(sign);
  const sha1Sign = sha1(sign);
  console.log(sha1Sign.toUpperCase());
  return getProxyUrl(
    url + "?api_token=" + apikey + "&sign=" + sha1Sign
  ) as string;
}

// regsiter de web applicatie bij de hockey.nl api om een api key te krijgen voor de web applicatie.

export function registerDevice() {
  if (!localStorage.getItem("device_id")) {
    localStorage.setItem("device_id", uuidv4());
  }
  var formdata = new FormData();
  formdata.append("device_id", localStorage.getItem("device_id") as string);
  formdata.append("device_os", "WEB");
  formdata.append("device_name", "");
  formdata.append("push_token", "");

  var requestOptions = {
    // mode: "no-cors",
    method: "POST",
    body: formdata,
    redirect: "follow",
  } as RequestInit;

  fetch(getProxyUrl("/v1/device/register"), requestOptions)
    .then((response) =>
      response
        .json()
        .then((data) => localStorage.setItem("hockeyAPIKey", data.api_token))
    )
    .catch((error) => console.log("error", error));
}

// als applicatie niet meer gebruikt wordt, dan moet de web applicatie zich afmelden bij de hockey.nl api.

export function unregsiterDevice() {
  var formdata = new FormData();
  formdata.append("device_id", localStorage.getItem("device_id") || "");
  formdata.append("api_token", localStorage.getItem("hockeyAPIKey") || "");

  var requestOptions = {
    // mode: "no-cors",
    method: "POST",
    body: formdata,
    redirect: "follow",
  } as RequestInit;

  fetch(getProxyUrl("/v1/device/unregister"), requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

// haal de lijst met clubs op

export function getClubs() {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  } as RequestInit;

  fetch(signURL("/v1/clubs/all", []), requestOptions)
    .then((response) => response.json().then((data) => console.log(data)))
    .catch((error) => console.log("error", error));
}

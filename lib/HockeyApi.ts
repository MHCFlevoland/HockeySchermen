// proxy de api door corsproxy.io om de cors errors te voorkomen en de api te kunnen gebruiken vanuit de browser.
// mode: no-cors werkt niet met de hockey.nl api, omdat je een leege response krijgt.

function getProxyUrl(slug: string): string {
  return (
    "https://corsproxy.io/?" +
    encodeURIComponent("https://publicaties.hockeyweerelt.nl/mc" + slug)
  );
}

// haal de lijst met clubs op

export async function getClubs(): Promise<any> {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  } as RequestInit;

  return fetch(getProxyUrl("/clubs"), requestOptions)
    .then((response) => response.json().then((data) => data?.data))
    .catch((error) => console.log("error", error));
}

export async function getClubInfo(clubId: string): Promise<any> {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  } as RequestInit;

  return fetch(getProxyUrl("/clubs/" + clubId), requestOptions)
    .then((response) => response.json().then((data) => data?.data))
    .catch((error) => console.log("error", error));
}

// lijst met teams van een club ophalen

export async function getClubTeams(clubId: string): Promise<any> {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  } as RequestInit;

  return fetch(getProxyUrl("/clubs/" + clubId + "/teams"), requestOptions)
    .then((response) => response.json().then((data) => data?.data))
    .catch((error) => console.log("error", error));
}

// lijst met opkomende wedstrijden van een team ophalen

export async function getTeamMatchesUpcoming(teamId: string): Promise<any> {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  } as RequestInit;

  return fetch(
    getProxyUrl("/teams/" + teamId + "/matches/upcoming?&show_all=1"),
    requestOptions
  )
    .then((response) => response.json().then((data) => data?.data))
    .catch((error) => console.log("error", error));
}

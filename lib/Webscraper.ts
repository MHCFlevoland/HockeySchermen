import * as cheerio from "cheerio";

function getProxyUrl(slug: string): string {
  let url = "https://www.mhcflevoland.nl";
  // if (typeof window != "undefined") {
  //   url = JSON.parse(window.localStorage.getItem("PublicAPIKey") as string);
  // }
  return "https://corsproxy.io/?" + encodeURIComponent(url + "/" + slug);
}

export async function getNews(): Promise<any[]> {
  const url = getProxyUrl("index.php?page=Nieuws");
  const response = await fetch(url);
  const items = [];

  try {
    const newsHTML = cheerio.load((await response.text()).toString());
    const title = newsHTML("h1.article-intro__title")
      .map((i, el) => newsHTML(el).text())
      .get();
    const image = newsHTML("a.article-intro__image img")
      .map((i, el) => newsHTML(el).attr("src"))
      .get();
    const description = newsHTML("div.article-intro__introduction")
      .map((i, el) => newsHTML(el).text())
      .get();
    for (let i = 0; i < title.length; i++) {
      items.push({
        title: title[i],
        image: image[i],
        description: description[i].replace("Lees meer", ""),
      });
    }
  } catch (error) {
    console.log(error);
  }

  return items;
}

export async function getCalendar(): Promise<any[]> {
  const url = getProxyUrl("index.php?page=Agenda");
  const response = await fetch(url);
  const items = [];

  try {
    const calendarHTML = cheerio.load((await response.text()).toString());
    const title = calendarHTML("h4.calendar-item__title")
      .map((i, el) => calendarHTML(el).text())
      .get();
    const day = calendarHTML("div.calendar__day__date")
      .map((i, el) => calendarHTML(el).text())
      .get();
    const timeFrom = calendarHTML("span.calendar-item__time-from")
      .map((i, el) => calendarHTML(el).text())
      .get();
    const timeTo = calendarHTML("span.calendar-item__time-from")
      .map((i, el) => calendarHTML(el).text())
      .get();
    for (let i = 0; i < title.length; i++) {
      items.push({
        title: title[i],
        day: day[i],
        time: timeFrom[i] + " - " + timeTo[i],
      });
    }
    console.log(items);
  } catch (error) {
    console.log(error);
  }

  return items;
}

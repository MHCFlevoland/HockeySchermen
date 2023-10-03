"use client";

import { getNews } from "@/lib/Webscraper";
import { useState } from "react";
import { useEffectOnce } from "usehooks-ts";

export default function News() {
  const [news, setNews] = useState([] as any[]);
  useEffectOnce(() => {
    getNews().then((news) => {
      console.log(news.slice(0, 3));
      setNews(news.slice(0, 3));
    });
  });
  return (
    <div className="w-full h-fit mb-8">
      <h1 className="border-b-4 border-blue-500 items-center px-6 text-4xl font-semibold">
        Nieuws
      </h1>
      <div id="nieuws" className="grid gap-2 mt-2">
        {news.map((item) => {
          return (
            <div
              key={item.title.slice(0, 24)}
              className="grid grid-cols-4 gap-2 px-1"
            >
              <div className="flex flex-col w-full h-auto col-span-1">
                <img src={item.image} alt="" className=" h-auto w-full" />
              </div>
              <div className="flex flex-col col-span-3">
                <h1 className="text-2xl font-semibold">{item.title}</h1>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

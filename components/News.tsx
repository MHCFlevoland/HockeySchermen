"use client";

import { getNews } from "@/lib/Webscraper";
import { Suspense, useState } from "react";
import { useEffectOnce } from "usehooks-ts";
import { Carousel } from "flowbite-react";

export default function News() {
  const [news, setNews] = useState([] as any[]);
  useEffectOnce(() => {
    getNews().then((news) => {
      console.log(news.slice(0, 5));
      setNews(news.slice(0, 5));
    });
  });
  return (
    <div className="w-full h-fit mb-8">
      <h1 className="border-b-4 border-blue-500 items-center px-6 text-4xl font-semibold">
        Nieuws
      </h1>
      <Suspense fallback={<div></div>}>
        {news.length === 0 ? (
          <div></div>
        ) : (
          <Carousel
            leftControl=" "
            rightControl=" "
            className="w-full h-[300px]"
            slideInterval={9000}
            indicators={false}
          >
            {news.map((item) => {
              return (
                <div key={item.title.slice(0, 24)} className="p-4 h-full">
                  <div className="grid grid-cols-4 gap-2">
                    <div className="flex flex-col w-full h-auto col-span-1">
                      <img src={item.image} alt="" className=" h-auto w-full" />
                    </div>
                    <div className="flex flex-col col-span-3">
                      <h1 className="text-2xl font-semibold h-full text-center">
                        {item.title}
                      </h1>
                    </div>
                  </div>
                  <div className=" mb-auto pt-2 text-md font-semibold">
                    {item.description}
                  </div>
                </div>
              );
            })}
          </Carousel>
        )}
      </Suspense>
      {/* <div id="nieuws" className="grid gap-2 mt-2">
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
      </div> */}
    </div>
  );
}

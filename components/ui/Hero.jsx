import React from "react";
import { Button } from "./button";
import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="space-y-3 mt-8 overflow-hidden bg-white transition-all duration-200 ease-in-out lg:space-y-20">
      <div className="relative isolate @container">
        <div className="relative inset-0 -z-10 mx-auto hidden w-full md:block xl:max-w-[1800px] top-52 md:top-20">
          <div className="absolute -left-10 w-full max-w-[20vw] lg:max-w-[17vw] xl:max-w-[200px]">
            <img
              alt="pixels"
              draggable="false"
              loading="lazy"
              width={0}
              height={0}
              decoding="async"
              data-nimg={1}
              className="w-full"
              style={{ color: "transparent" }}
              src="https://cdn-crayo.com/lp/public/landing/pixel1.svg"
            />
          </div>
          <div className="absolute -right-16 w-full max-w-[26vw] lg:max-w-[20vw] xl:max-w-[250px]">
            <img
              alt="pixels"
              draggable="false"
              loading="lazy"
              width={0}
              height={0}
              decoding="async"
              data-nimg={1}
              className="w-full"
              style={{ color: "transparent" }}
              src="https://cdn-crayo.com/lp/public/landing/pixel2.svg"
            />
          </div>
        </div>
        <div className="mx-auto max-w-2xl space-y-6 pb-16 pt-28 @sm:pt-32 @4xl:max-w-6xl @4xl:space-y-8 @4xl:pt-16 md:pt-8">
          <div className="flex flex-col items-center space-y-5 lg:space-y-6">
            <div className="mx-auto inline-block rounded-full bg-gray-100 px-4 py-1.5 text-sm font-medium text-primary">
              🚀 Revolutionizing Marketing Research
            </div>
            <h1 className="text-center font-inter-display text-5xl font-semibold text-gray-900 @2xl:text-7xl lg:text-balance lg:text-6xl lg:tracking-[0.015em]">
              Discover Insights
              <br className="inline @5xl:hidden" />
              Powerful Marketing
              <br /> with Ferranax
            </h1>
            <p className="text-balance text-center text-lg text-[#868C98]/90 @md:max-w-xl lg:text-lg">
			The Keyword Alchemist Uncover the Keywords that Matter.
            </p>
          </div>
          <div className="flex items-center justify-center gap-x-6">
            <Link
              href="/started"
              className="overflow-hidden rounded-full border-[6px] border-[#DBE5FF] bg-[#3870FF] px-8 py-5 shadow-sm transition-colors hover:bg-[#3870FF]/80 md:px-[37px] md:py-[23px]"
            >
              <div className="relative -left-8 top-0 isolate scale-y-[0.4]">
                <svg
                  viewBox="0 0 1024 1024"
                  aria-hidden="true"
                  className="absolute z-10 size-[15rem]"
                >
                  <circle
                    r={512}
                    cx={512}
                    cy={512}
                    fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
                    fillOpacity="0.7"
                  />
                  <defs>
                    <radialGradient
                      r={1}
                      cx={0}
                      cy={0}
                      id="759c1415-0410-454c-8f7c-9a820de03641"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(512 512) rotate(90) scale(512)"
                    >
                      <stop stopColor="#91F4FF" />
                      <stop offset={1} stopColor="#91F4FF" stopOpacity={0} />
                    </radialGradient>
                  </defs>
                </svg>
              </div>
              <span className="relative z-10 text-lg font-medium tracking-wide text-white md:text-[26px]">
                Get Started
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

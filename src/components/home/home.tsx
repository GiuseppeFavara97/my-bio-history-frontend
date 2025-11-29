import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import React from "react";

const Home = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto grid w-full max-w-(--breakpoint-xl) gap-12 px-6 py-12 lg:grid-cols-2">
        <div>
          <h1 className="mt-6 max-w-[17ch] text-4xl leading-[1.2]! font-semibold tracking-tighter md:text-5xl lg:text-[2.75rem] xl:text-[3.25rem]">
            Benvenuto su My Bio History
          </h1>
          <p className="mt-6 max-w-[60ch] sm:text-lg">
            Bla bla bla.
          </p>
        </div>
        <img src="logo.png" alt="" />
      </div>
    </div>
  );
};

export default Home;
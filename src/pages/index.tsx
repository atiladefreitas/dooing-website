import Head from "next/head";
import { Typography, Card, Button } from "@material-tailwind/react";
import { ThreeDCardDemo } from "@/components/3dcard";
import { ArrowDown, Calendar, Circle, Github } from "lucide-react";
import RepoStats from "@/components/RepoStats";
import CodeRender from "@/components/CodeRender";
import DefaultConfig from "@/components/DefaultConfig";
import Image from "next/image";
import Link from "next/link";

const FloatingCalendar = () => {
  const isHighlighted = (num: number) =>
    [1, 7, 8, 14, 15, 21, 22, 28, 29].includes(num);

  return (
    <div className="bg-[#16161E] absolute  border-black/[0.1] w-auto sm:w-[20rem] h-auto rounded-xl p-2 border z-50 shadow-2xl left-20 bottom-60">
      <div className="w-full h-full border-[3px] border-[#27A1B9] rounded-md relative p-2">
        <div className="w-full  flex items-center justify-center absolute -mt-4">
          <p className="text-[#27A1B9] bg-[#16161e] px-2 font-bold">
            {" "}
            December 2024{" "}
          </p>
        </div>

        <div className="mt-4 px-4 py-2 select-none">
          <div className="grid grid-cols-7 text-[#7AA2F7] font-bold">
            <p>Su</p>
            <p>Mo</p>
            <p>Tu</p>
            <p>We</p>
            <p>Th</p>
            <p>Fr</p>
            <p>Sa</p>
          </div>
          <div className="grid grid-cols-7 ">
            {Array.from({ length: 31 }, (_, i) => (
              <div
                key={i + 1}
                className={`${isHighlighted(i + 1) ? "text-[#27A1B9]" : "text-white"} font-bold`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const TodoList = () => {
  return (
    <div className="bg-[#16161E] absolute border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-2 border select-none shadow-2xl ">
      <div className="w-full h-full border-[3px] border-[#27A1B9] rounded-md relative p-2 pb-32">
        <div className="w-full  flex items-center justify-center absolute -mt-4">
          <p className="text-[#27A1B9] bg-[#16161e] px-2 font-bold"> to-dos </p>
        </div>

        <div className="mt-6 ">
          <div className="flex items-center pl-4 ">
            <p className="text-[#AE8852] font-bold flex items-center">
              <Circle size={14} className="mr-2" />
              Build this plugin site [{" "}
              <Calendar size={14} className="mx-[4px]" /> 30 November of 2024 ]{" "}
            </p>
          </div>
        </div>

        <div className="flex items-center pl-4 ">
          <p className="text-[#AE8852] font-bold flex items-center">
            <Circle size={14} className="mr-2" />
            Comment my code while I still remember what it does
          </p>
        </div>

        <div className="flex items-center pl-4 ">
          <p className="text-[#AE8852] font-bold flex items-center">
            <Circle size={14} className="mr-2" />
            Find out why my rubber duck stopped working #debug
          </p>
        </div>

        <div className="flex items-center pl-4 ">
          <p className="text-[#AE8852] font-bold flex items-center">
            <Circle size={14} className="mr-2" />
            Stop procrastinating (tomorrow)
          </p>
        </div>

        <div className="flex items-center pl-4 ">
          <p className="text-gray-600 flex items-center italic">
            <Circle size={14} className="mr-2" />
            ~Debug my life~
          </p>
        </div>

        <div className="flex items-center pl-4 ">
          <p className="text-gray-600 flex items-center italic">
            <Circle size={14} className="mr-2" />
            ~Lean to exit vim properly~
          </p>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <>
      <div className="h-screen  w-screen dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center px-4">
        <div className="absolute flex flex-col left-1/2 bottom-0 transform -translate-x-1/2 mb-6 items-center justify-center">
          <p>Install Dooing</p>
          <ArrowDown size={24} className=" animate-bounce" />
        </div>
        <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2">
          <div className="md:h-screen w-full flex  flex-col justify-center relative md:px-32 gap-12">
            <p className="text-blue-gray-900 font-bold text-4xl">Dooing</p>
            <p className="text-blue-gray-900 text-lg">
              Dooing is a minimalist todo list manager for Neovim, designed with
              simplicity and efficiency in mind. It provides a clean,
              distraction-free interface to manage your tasks directly within
              Neovim. Perfect for users who want to keep track of their todos
              without leaving their editor.
            </p>

            <Link href="https://github.com/atiladefreitas/dooing">
              <Button
                placeholder="button"
                size="lg"
                className="flex items-center gap-4"
              >
                <Github />
                See on GitHub
              </Button>
            </Link>

            <RepoStats />
          </div>
          <div className="md:h-screen w-full flex items-center justify-center relative">
            <Image width={1200} height={300} alt="Demo" src="/frame.png" />
          </div>
        </div>
      </div>

      <div className="h-screen  w-screen dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex items-center justify-center px-4">
        <div className="pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <CodeRender />
      </div>

      <div className="h-fit  w-screen dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex items-center justify-center px-4 flex-col">
        <div className="pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <DefaultConfig />

        <div className="my-12 flex items-center gap-2">
          Made in
          <Image width={20} height={20} alt="brazil flag" src="/br.png" />
          with
          <Image width={20} height={20} alt="heart" src="/heart.png" />
        </div>
      </div>
    </>
  );
}

/*
 

 * */

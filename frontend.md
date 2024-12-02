## src/components/RepoStats.tsx
```typescript
import { Tooltip } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/24/solid";

interface Contributor {
  id: number;
  login: string;
  html_url: string;
  avatar_url: string;
}

const RepoStats = () => {
  const [repoData, setRepoData] = useState<{
    stars: number;
    contributors: Contributor[];
  }>({
    stars: 0,
    contributors: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const repoUrl = "https://api.github.com/repos/atiladefreitas/dooing";
      const contributorsUrl = `${repoUrl}/contributors`;

      try {
        const [repoRes, contributorsRes] = await Promise.all([
          fetch(repoUrl),
          fetch(contributorsUrl),
        ]);

        const repoJson = await repoRes.json();
        const contributorsJson = await contributorsRes.json();

        setRepoData({
          stars: repoJson.stargazers_count,
          contributors: contributorsJson,
        });
      } catch (error) {
        console.error("Error fetching repository data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="">
      <span className="flex">
        <StarIcon className="h-8 w-8 text-yellow-800" />
        <p className="text-blue-gray-800 font-bold text-2xl">
          {repoData.stars}
        </p>
      </span>

      <h3 className="text-xl font-semibold mb-3">Contributors:</h3>
      <ul className="flex flex-wrap ">
        {repoData.contributors.map((contributor) => (
          <Tooltip key={contributor.id} content={contributor.login}>
            <li className="text-center -mr-3">
              <a
                href={contributor.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block transform transition-transform hover:scale-110"
              >
                <img
                  src={contributor.avatar_url}
                  alt={contributor.login}
                  className="w-20 h-20 rounded-full mx-auto mb-2 border-[2px] shadow-xl"
                />
              </a>
            </li>
          </Tooltip>
        ))}
      </ul>
    </div>
  );
};

export default RepoStats;
```


## src/components/3dcard.tsx
```typescript
"use client";

import Image from "next/image";
import React from "react";
import { Calendar, Circle } from "lucide-react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import Link from "next/link";

export function ThreeDCardDemo() {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-[#16161E] relative group/card  border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-2 border">
        <div className="w-full h-full border-[3px] border-[#27A1B9] rounded-md relative p-2">
          <div className="w-full  flex items-center justify-center absolute -mt-4">
            <p className="text-[#27A1B9] bg-[#16161e] px-2"> to-dos </p>
          </div>

          <CardItem translateZ={100} className="absolute">
            <div className="p-4 text-white bg-[#16161e]">December</div>
          </CardItem>

          <CardItem translateZ={50}>
            <div className="flex items-center pl-4 mt-6">
              <p className="text-[#AE8852] font-bold flex items-center">
                <Circle size={14} className="mr-2" />
                Build this plugin site [{" "}
                <Calendar size={14} className="mx-[4px]" /> 30 November of 2024
                ]{" "}
              </p>
            </div>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
```


## src/components/CodeRender.tsx
```typescript
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, CheckCheck } from "lucide-react";
import { Button } from "@material-tailwind/react";
import type { ComponentPropsWithoutRef } from "react";

interface CodeComponentProps extends ComponentPropsWithoutRef<"code"> {
  inline?: boolean;
  className?: string;
}

const CodeRender: React.FC = () => {
  const [markdownContent] = useState(`
\`\`\`lua
{
    "atiladefreitas/dooing",
    config = function()
        require("dooing").setup({
            -- your custom config here (optional)
        })
    end,
}
\`\`\`
`);

  const [copied, setCopied] = useState(false);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="col-span-2 max-w-4xl w-full flex flex-col items-center gap-12">
      <p className="text-4xl font-bold">Getting started with LazyVim</p>
      <ReactMarkdown
        className="w-full"
        components={{
          code: ({
            inline,
            className,
            children,
            ...props
          }: CodeComponentProps) => {
            const codeString = String(children).replace(/\n$/, "");

            if (!inline && className?.includes("language-lua")) {
              return (
                <div className="relative group">
                  <button
                    type="button"
                    onClick={() => handleCopy(codeString)}
                    className="absolute right-2 top-2 p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
                  >
                    {copied ? (
                      <CheckCheck className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-300" />
                    )}
                  </button>
                  <SyntaxHighlighter
                    // @ts-ignore
                    style={dracula}
                    language="lua"
                    PreTag="div"
                    {...props}
                  >
                    {codeString}
                  </SyntaxHighlighter>
                </div>
              );
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {markdownContent}
      </ReactMarkdown>
      <Button placeholder={"button"} size="lg" color="blue">
        See default configuration
      </Button>
    </div>
  );
};

export default CodeRender;
```


## src/components/ui/3d-card.tsx
```typescript
"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";

const MouseEnterContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);

export const CardContainer = ({
  children,
  className,
  containerClassName,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsMouseEntered(true);
    if (!containerRef.current) return;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    setIsMouseEntered(false);
    containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
  };
  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={cn(
          "py-20 flex items-center justify-center",
          containerClassName,
        )}
        style={{
          perspective: "1000px",
        }}
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "flex items-center justify-center relative transition-all duration-200 ease-linear",
            className,
          )}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

export const CardBody = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "h-96 w-96 [transform-style:preserve-3d]  [&>*]:[transform-style:preserve-3d]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const CardItem = ({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
  [key: string]: any;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMouseEntered] = useMouseEnter();

  useEffect(() => {
    handleAnimations();
  }, [isMouseEntered]);

  const handleAnimations = () => {
    if (!ref.current) return;
    if (isMouseEntered) {
      ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
    } else {
      ref.current.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
    }
  };

  return (
    <Tag
      ref={ref}
      className={cn("w-fit transition duration-200 ease-linear", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
};

// Create a hook to use the context
export const useMouseEnter = () => {
  const context = useContext(MouseEnterContext);
  if (context === undefined) {
    throw new Error("useMouseEnter must be used within a MouseEnterProvider");
  }
  return context;
};
```


## src/components/DefaultConfig.tsx
```typescript
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, CheckCheck } from "lucide-react";
import { Button } from "@material-tailwind/react";
import type { ComponentPropsWithoutRef } from "react";

interface CodeComponentProps extends ComponentPropsWithoutRef<"code"> {
  inline?: boolean;
  className?: string;
}

const DefaultConfig: React.FC = () => {
  const [markdownContent] = useState(`
\`\`\`lua
{
    -- Core settings
    save_path = vim.fn.stdpath("data") .. "/dooing_todos.json",

    -- Window settings
    window = {
        width = 55,         -- Width of the floating window
        height = 20,        -- Height of the floating window
        border = 'rounded', -- Border style
        padding = {
            top = 1,
            bottom = 1,
            left = 2,
            right = 2,
        },
    },

    -- To-do formatting
    formatting = {
        pending = {
            icon = "○",
            format = { "icon", "text", "due_date", "ect" },
        },
        done = {
            icon = "✓",
            format = { "icon", "text", "due_date", "ect" },
        },
    },
    
    -- Icons
    icons = {
        pending = '○',      -- Pending todo icon
        done = '✓',        -- Completed todo icon
        calendar = '',    -- Calendar icon
    },
    
    -- Keymaps
    keymaps = {
        toggle_window = "<leader>td", -- Toggle the main window
        new_todo = "i",              -- Add a new todo
        toggle_todo = "x",           -- Toggle todo status
        delete_todo = "d",           -- Delete the current todo
        delete_completed = "D",      -- Delete all completed todos
        close_window = "q",          -- Close the window
        add_due_date = "h",          -- Add due date to todo
        remove_due_date = "r",       -- Remove due date from todo
        toggle_help = "?",           -- Toggle help window
        toggle_tags = "t",           -- Toggle tags window
        clear_filter = "c",          -- Clear active tag filter
        edit_todo = "e",             -- Edit todo item
        edit_tag = "e",              -- Edit tag [on tag window]
        delete_tag = "d",            -- Delete tag [on tag window]
        search_todo = "/",           -- Toggle todo searching
        toggle_priority = "<Space>"  -- Toggle todo priority on creation
    },

    -- Priority settings
    priorities = {                   -- Define available priorities
        {
            name = "important",
            weight = 4,              -- Higher weight = higher priority
        },
        {
            name = "urgent",
            weight = 2,
        },
    },
    priority_groups = {              -- Define highlight groups for priority combinations
        high = {
            members = { "important", "urgent" },
            color = nil,             -- Custom color (hex) or nil to use hl_group
            hl_group = "DiagnosticError",
        },
        medium = {
            members = { "important" },
            color = nil,
            hl_group = "DiagnosticWarn",
        },
        low = {
            members = { "urgent" },
            color = nil,
            hl_group = "DiagnosticInfo",
        },
    },
    hour_score_value = 1/8,         -- Priority score adjustment based on estimated hours

    -- Default keymaps
	keymaps = {
		toggle_window = "<leader>td",
		new_todo = "i",
		toggle_todo = "x",
		delete_todo = "d",
		delete_completed = "D",
		close_window = "q",
		add_due_date = "H",
		remove_due_date = "r",
		toggle_help = "?",
		toggle_tags = "t",
		clear_filter = "c",
		edit_todo = "e",
		edit_tag = "e",
		delete_tag = "d",
		search_todos = "/",
		import_todos = "I",
		export_todos = "E",
		remove_duplicates = "<leader>D",
	},

    -- Calendar options
	calendar = {
		language = "en",
		icon = "",
		keymaps = {
			previous_day = "h",
			next_day = "l",
			previous_week = "k",
			next_week = "j",
			previous_month = "H",
			next_month = "L",
			select_day = "<CR>",
			close_calendar = "q",
		},
	},
}
\`\`\`
`);

  const [copied, setCopied] = useState(false);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="col-span-2 max-w-4xl w-full flex flex-col items-center gap-12 py-12">
      <p className="text-4xl font-bold">Getting started with LazyVim</p>
      <ReactMarkdown
        className="w-full"
        components={{
          code: ({
            inline,
            className,
            children,
            ...props
          }: CodeComponentProps) => {
            const codeString = String(children).replace(/\n$/, "");

            if (!inline && className?.includes("language-lua")) {
              return (
                <div className="relative group">
                  <button
                    type="button"
                    onClick={() => handleCopy(codeString)}
                    className="absolute right-2 top-2 p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
                  >
                    {copied ? (
                      <CheckCheck className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-300" />
                    )}
                  </button>
                  <SyntaxHighlighter
                    // @ts-ignore
                    style={dracula}
                    language="lua"
                    PreTag="div"
                    {...props}
                  >
                    {codeString}
                  </SyntaxHighlighter>
                </div>
              );
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
};

export default DefaultConfig;
```


## src/lib/utils.ts
```typescript
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```


## src/pages/_app.tsx
```typescript
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@material-tailwind/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
```


## src/pages/api/hello.ts
```typescript
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' })
}
```


## src/pages/_document.tsx
```typescript
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
```


## src/pages/index.tsx
```typescript
import Head from "next/head";
import { Typography, Card, Button } from "@material-tailwind/react";
import { ThreeDCardDemo } from "@/components/3dcard";
import { ArrowDown, Calendar, Circle } from "lucide-react";
import RepoStats from "@/components/RepoStats";
import CodeRender from "@/components/CodeRender";
import DefaultConfig from "@/components/DefaultConfig";

const FloatingCalendar = () => {
  const isHighlighted = (num) =>
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
      <div className="h-screen  w-screen dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative grid grid-cols-1 md:grid-cols-2">
        <div className="absolute flex flex-col left-1/2 bottom-0 transform -translate-x-1/2 mb-6 items-center justify-center">
          <p>Install Dooing</p>
          <ArrowDown size={24} className=" animate-bounce" />
        </div>
        <div className="h-screen w-full flex  flex-col justify-center relative md:px-32 gap-12">
          <p className="text-blue-gray-900 font-bold text-4xl">Dooing</p>
          <p className="text-blue-gray-900 text-lg">
            Dooing is a minimalist todo list manager for Neovim, designed with
            simplicity and efficiency in mind. It provides a clean,
            distraction-free interface to manage your tasks directly within
            Neovim. Perfect for users who want to keep track of their todos
            without leaving their editor.
          </p>

          <Button placeholder="button" size="lg">
            See on GitHub
          </Button>

          <RepoStats />
        </div>
        <div className="h-screen w-full flex items-center justify-center relative">
          <FloatingCalendar />
          <TodoList />
        </div>

        <div className="pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      <div className="h-screen  w-screen dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex items-center justify-center">
        <div className="pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <CodeRender />
      </div>

      <div className="h-fit  w-screen dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex items-center justify-center">
        <div className="pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <DefaultConfig />
      </div>
    </>
  );
}

/*
 

 * */
```


## next-env.d.ts
```typescript
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
```



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

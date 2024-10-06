"use client";
import React, { useState, useEffect } from 'react';
import Image from "next/image"
import LightningOutline from '@/assets/lightning6.png';
import LightningInside from '@/assets/lightning7.png';

interface TimerProps {
  startTime: number; // Prop for starting time
  remainingTime: number; // Prop for starting time
  paused: boolean; // Prop for pausing the timer
}

const Timer: React.FC<TimerProps> = ({ startTime, remainingTime, paused }) => {

  return ( 
  <div className="flex flex-col max-h-screen items-center justify-center my-16">
    <div className="relative flex justify-center items-start h-96">
     <div className="relative top-0 w-40 overflow-hidden justify-self-end"
     style={{height: `${100 - (100 * remainingTime / startTime)}%`,
        transitionProperty: "height",
        transitionDuration: "1000ms",
        transitionTimingFunction: "linear"}}>
       <Image
         alt="lightning yellow"
         src={LightningInside}
         className="absolute w-44 h-96"
       />
      </div>
      <Image
        alt="lightning outline"
        src={LightningOutline}
        className="absolute top-0 w-44 h-full" // Ensures it takes up available space while maintaining aspect ratio
      />
    </div>
    <div className="mt-6 mr-14 p-3 text-3xl flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600 border-yellow-500 border-2"
     style={{width: 80}}>{remainingTime}s</div>
  </div>
  );
};

export default Timer;

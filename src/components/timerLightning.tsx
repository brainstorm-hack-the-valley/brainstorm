"use client";
import React, { useState, useEffect } from 'react';
import Image from "next/image"
import LightningOutline from '@/assets/lightning2.png';
import LightningInside from '@/assets/lightning3.png';

interface TimerProps {
  startTime: number; // Prop for starting time
  paused: boolean; // Prop for pausing the timer
}

const Timer: React.FC<TimerProps> = ({ startTime, paused }) => {
  const [timeLeft, setTimeLeft] = useState(startTime); // Set the total time based on the prop
  const [pauseTime, setPauseTime] = useState(paused); // Set the pause time based on the prop

  let interval: NodeJS.Timeout;

  useEffect(() => {
    // Automatically start the timer when the component mounts
    interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval); // Clear interval when time reaches 0
          return 0; // Set time left to 0
        }
        return prevTime - 1; // Decrease time left by 1 second
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  useEffect(() => {
    // Pause the timer when the pauseTime prop is true
    if (pauseTime) {
      clearInterval(interval);
    }
  }, [pauseTime]);

  return ( 
  <div className="flex flex-col max-h-screen items-center justify-center my-16">
    <div className="relative flex justify-center items-start h-96">
     <div className="relative top-0 w-40 overflow-hidden justify-self-end"
     style={{height: `${100 - (100 * timeLeft / startTime)}%`, transitionProperty: "height", transitionDuration: "1000ms", transitionTimingFunction: "linear"}}>
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
    <div className="mt-6 my-10 mr-14 text-3xl text-white">{Math.ceil(timeLeft)}s</div>
  </div>
  );
};

export default Timer;

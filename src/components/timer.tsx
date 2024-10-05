"use client";
import React, { useState, useEffect } from 'react';

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
      setTimeLeft(prevTime => {
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
    <div className="flex flex-col items-center justify-center p-4">
      <div
        className="relative w-16 h-40 border-4 border-blue-500 rounded overflow-hidden"
        style={{
          backgroundImage: "url('https://www.transparenttextures.com/patterns/white-paper.png')",
          backgroundSize: 'cover',
        }}
      >
        <div
          className="absolute bottom-0 transition-all duration-1000 ease-in-out"
          style={{
            height: `${(timeLeft / startTime) * 100}%`, // Height based on time left
            width: '100%',
            background: 'linear-gradient(to bottom, #6899ed, #6899ef)', // Gradient color
            backgroundSize: 'cover',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', // Shadow for 3D effect
            borderRadius: '4px 4px 0 0', // Rounded top corners
          }}
        ></div>
      </div>
      <p className="mt-2 text-xl">{timeLeft}s</p>
    </div>
  );
};

export default Timer;

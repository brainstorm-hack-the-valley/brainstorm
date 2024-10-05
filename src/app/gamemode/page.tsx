'use client';
import React from 'react';
import { Cloud, CloudRain, CloudLightning, Ship, Sun, Timer, TimerOff, X, TimerOffIcon } from 'lucide-react';
import { LightningBoltIcon } from '@radix-ui/react-icons';
import Header from '../../components/ui/header';
import { useRouter } from "next/navigation";

import * as Game from "@/game/game"

let router;

function handleClick(gamemode: string) {
    localStorage.setItem("gamemode", gamemode);
    router.push("/gameinfo/" + gamemode);
    console.log(localStorage.getItem("gamemode"));
}

export default function Home() {
    router = useRouter();
    return (
        <div className="min-h-screen flex flex-col bg-blue-200">
            <Header />
            <div className="flex flex-col items-center justify-center mt-16">
                <h1 className="text-4xl font-bold text-blue-700 mb-2">Welcome Back!</h1>

                {/* Cloud with Text */}
                <div className="relative flex items-center justify-center mb-4">
                    {/* Cloud Icon */}
                    <Cloud className="w-80 h-60 text-white fill-current" />

                    {/* Text over Cloud */}
                    <div className="absolute flex items-center justify-center w-full h-full">
                        <p className="text-center text-lg text-blue-700 font-bold">
                            Choose A Lesson Plan
                        </p>
                    </div>
                </div>

                {/* Cards */}
                <div className="flex flex-col md:flex-row gap-6">
                    {/* First Card with Rain Icon and Ship */}
                    <div className="relative group bg-white shadow-md rounded-lg p-6 w-80 overflow-hidden"
                        onClick={() => handleClick(Game.A_RAINY_DAY.getId())}>
                        {/* Card Content */}
                        <h3 className="text-xl font-semibold mb-4">A Rainy Day</h3>
                        <CloudRain className="w-20 h-20 mx-auto mb-2 text-blue-500" />

                        {/* Surrounding Icons */}
                        <div className="flex justify-between mb-2">
                            <CloudRain className="w-12 h-12 text-blue-500 relative -top-4" />
                            <Ship className="w-20 h-20 mx-auto mb-4" />
                            <CloudRain className="w-12 h-12 text-blue-500 relative -top-4" />
                        </div>

                        {/* Overlay for Hover Effect */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-10 bg-white cursor-pointer">
                            <h3 className="text-xl font-semibold mb-2">A Rainy Day</h3>
                            <div className="flex items-center mb-2 justify-start w-full ml-2">
                                <TimerOff className="w-12 h-12 text-green-500 mr-2" />
                                <p className="text-gray-600">No time pressure.</p>
                            </div>
                            <div className="flex items-center mb-2 justify-start w-full ml-2">
                                <X className="w-12 h-12 text-red-500 mr-2" />
                                <p className="text-gray-600">Incorrect answers intensify the storm.</p>
                            </div>
                        </div>
                    </div>

                    {/* Second Card with Storm Icon and Ship */}
                    <div className="relative group bg-white shadow-md rounded-lg p-6 w-80 overflow-hidden"
                        onClick={() => handleClick(Game.A_STORMY_NIGHTMARE.getId())}>
                        {/* Card Content */}
                        <h3 className="text-xl font-semibold mb-4">A Stormy Nightmare</h3>
                        <CloudLightning className="w-20 h-20 mx-auto mb-2 text-yellow-500" />

                        {/* Surrounding Icons */}
                        <div className="flex justify-between mb-2">
                            <CloudLightning className="w-12 h-12 text-yellow-500 relative -top-4" />
                            <Ship className="w-20 h-20 mx-auto mb-4" />
                            <CloudLightning className="w-12 h-12 text-yellow-500 relative -top-4" />
                        </div>

                        {/* Overlay for Hover Effect */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-10 bg-white cursor-pointer">
                            <h3 className="text-xl font-semibold mb-2">A Stormy Nightmare</h3>
                            <div className="flex items-center mb-2 justify-start w-full ml-2">
                                <Timer className="w-12 h-12 text-yellow-500 mr-2" />
                                <p className="text-gray-600 px-1">10s timer.</p>
                            </div>
                            <div className="flex items-center mb-2 justify-start w-full ml-2">
                                <div className="relative flex items-center">
                                    {/* Lightning Bolt Icon filled with yellow */}
                                    <LightningBoltIcon className="absolute top-0 left-0 w-8 h-8 text-yellow-500 fill-current" />

                                    {/* Timer Off Icon */}
                                    <TimerOffIcon className="w-12 h-12 text-red-500 ml-2" />
                                </div>
                                <p className="text-gray-600 mr-5 px-2">Running out of time might be shocking.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
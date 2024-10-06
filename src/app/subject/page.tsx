'use client';
import React from 'react';
import { Plus, Globe2Icon, MapIcon, PinIcon, Compass, Brain, Pencil, Lightbulb, Book, Hourglass, ScrollTextIcon, Swords } from 'lucide-react';
import { LightningBoltIcon, ReloadIcon } from '@radix-ui/react-icons';
import Header from '../../components/ui/header';
import { useRouter } from "next/navigation";

let router;

function handleClick(subject: string) {
    localStorage.setItem("subject", subject);
    router.push("/gamemode");
    console.log(localStorage.getItem("subject"));
}

export default function Subject() {
    router = useRouter();
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            {/* Text over Cloud */}
            <div className="pt-10 flex flex-col items-center justify-center w-full h-full">
                <h1 className="text-center text-3xl text-blue-700 font-bold">
                    Choose A Subject
                </h1>
            </div>
            <div className="relative flex flex-col items-center justify-center mt-16">
                {/* Cards */}
                <div className="flex flex-col md:flex-row gap-6 rounded-lg shadow-md bg-blue-100 p-5">
                    {/* First Card with Rain Icon and Ship */}
                    <div className="relative group bg-white shadow-md rounded-lg p-6 w-80 overflow-hidden"
                        onClick={() => handleClick("Discrete Math")}>
                        {/* Card Content */}
                        <h3 className="text-xl font-semibold mb-4">Discrete Math</h3>
                        <Plus className="w-20 h-20 mx-auto mb-2 text-blue-500" />

                        {/* Surrounding Icons */}
                        <div className="flex justify-between mb-2">
                            <h2 className="w-12 h-12 text-blue-500 relative -top-4">True</h2>
                            <h1 className="text-5xl text-blue-500">ℕ</h1>
                            <h2 className="w-12 h-12 text-blue-500 relative -top-4">X→Y</h2>
                        </div>

                        {/* Overlay for Hover Effect */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-10 bg-white cursor-pointer">
                            <h3 className="text-xl font-semibold mb-2">Discrete Math</h3>
                            <div className="flex items-center mb-2 justify-center w-full ml-2">
                                <p className="text-gray-600">Test how well you know discrete math.</p>
                            </div>
                        </div>
                    </div>

                    {/* Second Card with Storm Icon and Ship */}
                    <div className="relative group bg-white shadow-md rounded-lg p-6 w-80 overflow-hidden"
                        onClick={() => handleClick("Geography")}>
                        {/* Card Content */}
                        <h3 className="text-xl font-semibold mb-4">Geography</h3>
                        <Compass className="w-20 h-20 mx-auto mb-2 text-green-800" />

                        {/* Surrounding Icons */}
                        <div className="flex justify-between mb-2">
                            <MapIcon className="w-12 h-12 text-green-800 relative -top-4" />
                            <Globe2Icon className="w-20 h-20 mx-auto mb-4 text-green-800" />
                            <PinIcon className="w-12 h-12 text-green-800 relative -top-4" />
                        </div>

                        {/* Overlay for Hover Effect */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-10 bg-white cursor-pointer">
                            <h3 className="text-xl font-semibold mb-2">Geography</h3>
                            <div className="flex items-center mb-2 justify-start w-full ml-2">
                                <p className="text-gray-600 px-1">Test how much you know about Geography.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-6 rounded-lg shadow-md bg-blue-100 p-5">
                    {/* First Card with Rain Icon and Ship */}
                    <div className="relative group bg-white shadow-md rounded-lg p-6 w-80 overflow-hidden"
                        onClick={() => handleClick("General Knowledge")}>
                        {/* Card Content */}
                        <h3 className="text-xl font-semibold mb-4">General Knowledge</h3>
                        <Book className="w-20 h-20 mx-auto mb-2 text-red-500" />

                        {/* Surrounding Icons */}
                        <div className="flex justify-between mb-2">
                            <Pencil className="w-12 h-12 relative text-red-500 -top-4" />
                            <Brain className="w-20 h-20 mx-auto mb-2 text-red-500" />
                            <Lightbulb className="w-12 h-12 text-red-500 relative -top-4" />
                        </div>

                        {/* Overlay for Hover Effect */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-10 bg-white cursor-pointer">
                            <h3 className="text-xl font-semibold mb-2">General Knowledge</h3>
                            <div className="flex items-center mb-2 justify-center w-full ml-2">
                                <p className="text-gray-600">Test how well you know general facts.</p>
                            </div>
                        </div>
                    </div>

                    {/* Second Card with Storm Icon and Ship */}
                    <div className="relative group bg-white shadow-md rounded-lg p-6 w-80 overflow-hidden"
                        onClick={() => handleClick("World History")}>
                        {/* Card Content */}
                        <h3 className="text-xl font-semibold mb-4">World History</h3>
                        <ScrollTextIcon className="w-20 h-20 mx-auto mb-2 text-yellow-800" />

                        {/* Surrounding Icons */}
                        <div className="flex justify-between mb-2">
                            <Hourglass className="w-12 h-12 text-yellow-800 relative -top-4" />
                            <Swords className="w-20 h-20 mx-auto mb-4 text-yellow-800" />
                            <ReloadIcon className="w-12 h-12 text-yellow-800 relative -top-4" />
                        </div>

                        {/* Overlay for Hover Effect */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-10 bg-white cursor-pointer">
                            <h3 className="text-xl font-semibold mb-2">World History</h3>
                            <div className="flex items-center mb-2 justify-start w-full ml-2">
                                <p className="text-gray-600 px-1">Test how much you know about World History.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
'use client';
import React from "react";
import { Trophy } from "lucide-react";
import { useRouter } from "next/navigation";

const EndScreen = () => {
    const numShock = localStorage.getItem("numShock");
    const numCorrect = localStorage.getItem("numCorrect");

    const router = useRouter();
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
        <div className="bg-slate-50 rounded-lg shadow-lg p-8 max-w-lg w-full text-center">
            {/* Trophy Icon */}
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            {/* Congratulatory Message */}
            <h1 className="text-3xl font-bold text-blue-700 mb-2">Congratulations!</h1>
            <p className="text-lg text-gray-600 mb-6">You've completed the lesson. Great job!</p>

            <div className="flex items-center justify-center space-x-5">
                <div className="bg-white rounded-lg shadow-lg border-2 p-5">
                    <p>You got shocked</p>
                    <p className="text-3xl">{numShock}</p>
                    <p>times.</p>
                </div>
                <div className="bg-white rounded-lg shadow-lg border-2 p-5">
                    <p>You got</p>
                    <p className="text-3xl">{numCorrect}</p>
                    <p>answers correct.</p>
                </div>
            </div>
            <button
                className="mt-8 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-full transition-colors"
                onClick={() => router.push("/subject")}
            >
                Continue Learning
            </button>
            </div>
        </div>
    );
};

export default EndScreen;

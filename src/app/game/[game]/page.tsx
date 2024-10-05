"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, CheckCircle, Smartphone, Zap, Shield } from "lucide-react"
import { LightningBoltIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import GameClouds from "@/components/brainstorm/GameClouds"
import Image from "next/image"
import PirateShip from "@/assets/pirate_ship.png"
import { BrainstormQuestion, getGamemodeById } from "@/game/game"
import { redirect } from "next/navigation"
import Timer from "@/components/timer"
import boat0 from '@/assets/boat0.png';
import boat1 from '@/assets/boat1.png';
import boat2 from '@/assets/boat2.png';
import boat3 from '@/assets/boat3.png';
const boatImages = [boat0, boat1, boat2, boat3];

function AnswerButton(props: { answer: string }) {
    const { answer } = props
    const [isClient, setIsClient] = useState(false);
    const rndInt = Math.floor(Math.random() * 3) + 1
    useEffect(() => {
      setIsClient(true); // This will trigger a re-render on the client
    }, []);
    const icons = []
    for (let i = 0; i < rndInt; i++) {
        icons.push(<LightningBoltIcon key={i} className="p-2 w-10 h-10 text-yellow-500 fill-current" />)
    }
    return (
        <Button
          className="relative rounded-xl w-auto h-36 text-2xl flex flex-col justify-center items-center"
          onClick={() => handleClick(rndInt)}
        >
        <p className="text-center">{answer}</p>
        {isClient && (
          <div className="absolute bottom-0 right-0 mb-2 mr-2 flex items-center justify-center rounded-full bg-yellow-100">
            {icons}
          </div>
        )}
      </Button>
    )
}

function handleClick(rndInt: number) {
    console.log("Clicked")
}

export default function Component({ params }: { params: { game: string } }) {
    const gameId = params.game
    const game = getGamemodeById(gameId)
    if (game === undefined) {
        redirect("/home")
    }

    const [gameState, setGameState] = useState({
        question: 1
    })

    const [questions, setQuestions] = useState([])

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // let gameStateJson = window.localStorage.getItem("gameState")
        // if (gameStateJson === null) {
        //     window.localStorage.setItem("gameState", JSON.stringify({
        //         question: 0,
        //         questions: []
        //     }))
        //     gameStateJson = window.localStorage.getItem("gameState")
        // }
        // const gameState = JSON.parse(gameStateJson as string)

        // const questions = gameState["questions"]
        // if (questions === null || questions.length === 0) {
        //     fetch(`/api/generate?topic=capital-cities"`).then(response => {
        //         response.json().then(data => {
        //             gameState["questions"] = data
        //             window.localStorage.setItem("gameState", JSON.stringify(gameState))
        //             setLoading(false)
        //         })
        //     })
        // }
        fetch(`/api/generate?topic=capital-cities`).then(response => {
            if (!response.ok) {
                console.log("Failed to fetch questions")
                return
            }
            response.json().then(data => {
                console.log("Fetched questions")
                console.log(data)
                setQuestions(data.data)
                setLoading(false)
            })
        })
    }, [])

    const question = questions[gameState.question - 1] as BrainstormQuestion

    // Boat effect (shaking)
    const [isShaking, setIsShaking] = useState(false);
    const startShaking = () => {
        setIsShaking(true);
        // Stop animation after 2 seconds
        setTimeout(() => {
            setIsShaking(false);
        }, 1000);
    };

    // Boat effect (fire)
    const [boatFire, setBoatFire] = useState(0);
    const incrementFire = () => {
        if (boatFire < 3) {
            const newFireLevel = boatFire + 1;
            setBoatFire(newFireLevel);
        }
    };

    // Set to a specific value
    const setFire = (n: number) => {
        if (n <= 3 && n >=0) {
            setBoatFire(n);
        }
    };

    function handleClick2() {
        startShaking();
        incrementFire();
    }

    if (loading) {
        return <div>Loading...</div>
    }
    
    return (
        <div className="relative flex flex-col min-h-screen bg-white">
            <GameClouds />
            <header className="py-4 px-4 lg:px-6 h-14 grid grid-cols-3 text-3xl 
      font-bold tracking-tighter">
                <span></span>
                <h1 className="mx-auto">{game.name}</h1>
                <h1 className="mx-auto text-xl tracking-normal">{`Question ${gameState.question}/10`}</h1>
            </header>
            <main className="flex mt-8">
                <div className="basis-1/4 flex flex-col items-center justify-center h-screen">
                    <Image 
                        width={200} height={200} 
                        alt="sailboat" 
                        src={boatImages[boatFire]}
                        className={`w-full ${isShaking ? 'animate-shake' : ''}`}
                    />
                </div>
                <div className="basis-1/2">
                    <Card className="rounded-xl shadow-lg">
                        <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                            <h1 className="text-2xl font-bold tracking-tighter">
                                {`${question.question}`}
                            </h1>
                        </CardContent>
                    </Card>
                    <div className="grid grid-cols-2 grid-rows-2 mt-8 gap-8">
                        <AnswerButton answer={question.options[0]} />
                        <AnswerButton answer={question.options[1]} />
                        <AnswerButton answer={question.options[2]} />
                        <AnswerButton answer={question.options[3]} />
                    </div>
                </div>
                <div className="basis-1/4 flex flex-col items-center justify-center">
                    <Timer startTime={10} paused={false} />
                    <button
                        onClick={handleClick2}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Click Me
                    </button>
                </div>
            </main>
        </div>
    )
}
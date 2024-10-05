"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, CheckCircle, Smartphone, Zap, Shield, TriangleAlert } from "lucide-react"
import { LightningBoltIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import GameClouds from "@/components/brainstorm/GameClouds"
import Image from "next/image"
import PirateShip from "@/assets/pirate_ship.png"
import { BrainStormDifficulty, BrainStormGamemode, BrainstormQuestion, getDifficultyById, getGamemodeById, PEACEFUL } from "@/game/game"
import { redirect } from "next/navigation"
import Timer from "@/components/timer"
import boat0 from '@/assets/boat0.png';
import boat1 from '@/assets/boat1.png';
import boat2 from '@/assets/boat2.png';
import boat3 from '@/assets/boat3.png';
const boatImages = [boat0, boat1, boat2, boat3];
import { connectFlipper, disconnectFlipper, readFlipperResponse, sendFlipperCommand } from "@/flipper/flipper"
import { randInt } from "three/src/math/MathUtils.js"
import { sendShock } from "@/app/api/generate/util"
import CorrectOverlay from "@/components/brainstorm/CorrectOverlay"
import { start } from "repl"

function AnswerButton(props: { answer: string, 
                      answerCallback: (answer: string, shockLevel: number) => void }) {
    const { answer, answerCallback } = props
    const [isClient, setIsClient] = useState(false);
    const shockLevel = Math.floor(Math.random() * 3) + 1

    useEffect(() => {
      setIsClient(true); // This will trigger a re-render on the client
    }, []);
    const icons = []
    for (let i = 0; i < shockLevel; i++) {
        icons.push(<LightningBoltIcon key={i} className="p-2 w-10 h-10 text-yellow-500 fill-current" />)
    }
    return (
        <Button
            className="relative rounded-xl w-auto h-36 text-2xl flex flex-col justify-center items-center"
            onClick={() => answerCallback(answer, shockLevel)}
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

enum AnswerFeedback {
    CORRECT,
    INCORRECT,
    NONE
}

export default function Component({ params }: { params: { game: string } }) {
    const gameId = params.game
    const game = getGamemodeById(gameId)
    if (game === undefined) {
        redirect("/home")
    }

    const [gameDifficulty, setGameDifficulty] = useState<BrainStormDifficulty>(PEACEFUL)
    const [questionNumber, setQuestionNumber] = useState(1)
    const [incorrectAnswers, setIncorrectAnswers] = useState(0)
    const [timeLeft, setTimeLeft] = useState(10)
    const [feedback, setFeedback] = useState(AnswerFeedback.NONE)

    const [questions, setQuestions] = useState<BrainstormQuestion[]>([])
    const [loading, setLoading] = useState(true)
    const [flipperPort, setFlipperPort] = useState<any>(null)

    useEffect(() => {
        let difficultyId = window.localStorage.getItem("difficulty")
        if (difficultyId === null) {
            difficultyId = PEACEFUL.id
            window.localStorage.setItem("difficulty", difficultyId)
        }
    
        const gameDifficulty = getDifficultyById(difficultyId as string)
        if (gameDifficulty === undefined) {
            redirect("/home")
        }
        setGameDifficulty(gameDifficulty)

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

        connectFlipper(false).then(port => {
            setFlipperPort(port)
        })

        return () => {
            if (flipperPort !== null) {
                disconnectFlipper(flipperPort)
            }
        }
    }, [])

    useEffect(() => {
        if (flipperPort === undefined || flipperPort === null) {
            return
        }
        console.log("Updated port: ", flipperPort)
        function readResponse() {
            readFlipperResponse(flipperPort).then(_ => {
                setTimeout(() => {
                    readResponse()
                }, 1000);
            })
        }
        readResponse()
    }, [flipperPort])
    
    const question = questions[questionNumber - 1] as BrainstormQuestion

    function handleAnswer(answer: string, shockLevel: number) {
        console.log(`Answered ${answer} with shock level ${shockLevel}`)
        const correct = answer === question.answer
        const nextQuestionNumber = questionNumber + 1
        const nextIncorrect = incorrectAnswers + (correct ? 0 : 1)
        setQuestionNumber(nextQuestionNumber)
        setIncorrectAnswers(nextIncorrect)
        setTimeLeft(10)
        setFeedback(correct ? AnswerFeedback.CORRECT : AnswerFeedback.INCORRECT)
        if (!correct) {
            sendShock(flipperPort, game as BrainStormGamemode, gameDifficulty as BrainStormDifficulty)
            startShaking()
            incrementFire()
        }
        setInterval(() => {
            if (nextQuestionNumber + 1 >= questionNumber) {
                console.log("Question has changed, not resetting animation.")
                return
            }
            setFeedback(AnswerFeedback.NONE)
        }, 1000)
    }

    function connectToFlipper() {
        connectFlipper(true).then(port => {
            setFlipperPort(port)
        })
    }

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

    if (loading) {
        return <div>Loading...</div>
    }
    
    return (
        <div className="relative flex flex-col min-h-screen bg-white">
            <GameClouds />
            <CorrectOverlay correct={feedback === AnswerFeedback.CORRECT} 
                className={feedback === AnswerFeedback.NONE ? "opacity-0" : "opacity-100"}
            />
            <header className="py-4 px-4 lg:px-6 h-14 grid grid-cols-3 text-3xl 
      font-bold tracking-tighter">
                <span></span>
                <h1 className="mx-auto">{game.name}</h1>
                <h1 className="mx-auto text-xl tracking-normal">{`Question ${questionNumber}/10`}</h1>
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
                    {
                        flipperPort === null && (
                            <div className="flex justify-center items-center">
                                <Button className="flex items-center justify-center space-x-2 p-4"
                                    onClick={connectToFlipper}
                                >
                                    <TriangleAlert className="h-6 w-6" />
                                    <span>Please Connect Learning Device</span>
                                </Button>
                            </div>
                        )
                    }
                    {
                        flipperPort !== null && (
                            <>
                                <Card className="rounded-xl shadow-lg">
                                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                                    <h1 className="text-2xl font-bold tracking-tighter">
                                        {`${question.question}`}
                                    </h1>
                                </CardContent>
                                </Card>
                                <div className="grid grid-cols-2 grid-rows-2 mt-8 gap-8">
                                    <AnswerButton answer={question.options[0]} answerCallback={handleAnswer} />
                                    <AnswerButton answer={question.options[1]} answerCallback={handleAnswer} />
                                    <AnswerButton answer={question.options[2]} answerCallback={handleAnswer} />
                                    <AnswerButton answer={question.options[3]} answerCallback={handleAnswer} />
                                </div>
                            </>
                        ) 
                    }
                </div>
                <div className="basis-1/4 flex flex-col items-center justify-center">
                    <Timer startTime={10} paused={false} />
                </div>
            </main>
        </div>
    )
}
"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, CheckCircle, Smartphone, Zap, Shield, Brain, TriangleAlert, Router } from "lucide-react"
import { LightningBoltIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import GameClouds from "@/components/brainstorm/GameClouds"
import Image from "next/image"
import PirateShip from "@/assets/pirate_ship.png"
import { BrainStormDifficulty, BrainStormGamemode, BrainstormQuestion, getDifficultyById, getGamemodeById, PEACEFUL } from "@/game/game"
import { redirect } from "next/navigation"
import Timer from "@/components/timer"
import TimerLightning from "@/components/timerLightning"
import boat0 from '@/assets/boat0.png';
import boat1 from '@/assets/boat1.png';
import boat2 from '@/assets/boat2.png';
import boat3 from '@/assets/boat3.png';
import lightning from '@/assets/lightning.png';
const boatImages = [boat0, boat1, boat2, boat3];
import { connectFlipper, disconnectFlipper, readFlipperResponse, sendFlipperCommand } from "@/flipper/flipper"
import { randInt } from "three/src/math/MathUtils.js"
import { sendShock } from "@/app/game/[game]/util"
import CorrectOverlay from "@/components/brainstorm/CorrectOverlay"
import { start } from "repl"
import { useRouter } from "next/navigation"

function AnswerButton(props: {
  answer: string,
  shockLevel: number,
  answerCallback: (answer: string, shockLevel: number) => void
}) {
  const { answer, shockLevel, answerCallback } = props
  const [isClient, setIsClient] = useState(false);

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
      <p className="text-center text-wrap">{answer}</p>
      {isClient && (
        <div className="absolute bottom-0 right-0 mb-2 mr-2 flex items-center justify-center rounded-full bg-yellow-100">
          {icons}
        </div>
      )}
    </Button>
  )
}

export default function Component({ params }: { params: { game: string } }) {
  let fetched = false;
  const gameId = params.game
  const game = getGamemodeById(gameId)
  if (game === undefined) {
    redirect("/home")
  }
  const router = useRouter()

  const topic = window.localStorage.getItem("subject")
  const difficulty = window.localStorage.getItem("difficulty")
  if (!topic || !difficulty) {
    redirect("/")
  }

  const [gameState, setGameState] = useState({
    question: 1
  })
  const startTime = 30;
  const [gameDifficulty, setGameDifficulty] = useState<BrainStormDifficulty>(PEACEFUL)
  const [questionNumber, setQuestionNumber] = useState(1)
  const [incorrectAnswers, setIncorrectAnswers] = useState(0)
  const [timeLeft, setTimeLeft] = useState(startTime); // Set the total time based on the prop
  const [pauseTime, setPauseTime] = useState(false); // Set the pause time based on the prop
  const [correct, setCorrect] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [shockValues, setShockValues] = useState([0, 0, 0, 0])


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

    if (fetched) {
      return
    }
    fetch(`/api/generate?topic=${topic}&difficulty=${difficulty}`).then(response => {
      if (!response.ok) {
        console.log("Failed to fetch questions")
        fetched = false
        return
      }
      response.json().then(data => {
        console.log("Fetched questions")
        setQuestions(data.data)
        setLoading(false)
      })
    })
    fetched = true
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

  function handleTimeout() {
    console.log("Timeout")
    sendShock(flipperPort, game as BrainStormGamemode, gameDifficulty as BrainStormDifficulty, 3)
  }

  const question = questions[questionNumber - 1] as BrainstormQuestion

    function handleAnswer(answer: string, shockLevel: number) {
        if (showFeedback) {
            return  
        }
        console.log(`Answered ${answer} with shock level ${shockLevel}`)
        const correct = answer === question.answer
        const nextQuestionNumber = (questionNumber % questions.length) + 1
        const nextIncorrect = incorrectAnswers + (correct ? 0 : 1)
        setIncorrectAnswers(nextIncorrect)
        setCorrect(correct)
        setShowFeedback(true)
        generateShockValues()
        if (!correct) {
            sendShock(flipperPort, game as BrainStormGamemode, 
                        gameDifficulty as BrainStormDifficulty, shockLevel)
            startShaking()
            incrementFire()
        } else {
            setTimeLeft(timeLeft + 5)
        }
        setTimeout(() => {
            // if (questionNumber > nextQuestionNumber) {
            //     console.log("Question has changed, not resetting animation.")
            //     return
            // }
            setQuestionNumber(nextQuestionNumber)
            setShowFeedback(false)
        }, 1000)
    }

  function generateShockValues() {
    let s0 = Math.floor(Math.random() * 3) + 1;
    let s1 = Math.floor(Math.random() * 3) + 1;
    let s2 = Math.floor(Math.random() * 3) + 1;
    let s3 = Math.floor(Math.random() * 3) + 1;
    setShockValues([s0, s1, s2, s3])
  }

  function connectToFlipper() {
    connectFlipper(true).then(port => {
      setFlipperPort(port)
    })
  }

    // Boat effect (shaking)
    const [isShaking, setIsShaking] = useState(false);
    const [isLightning, setIsLightning] = useState(false);
    const startShaking = () => {
        setIsShaking(true);
        setIsLightning(true);
        // Stop animation after 2 seconds
        setTimeout(() => {
            setIsLightning(false);
        }, 200);
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
    if (n <= 3 && n >= 0) {
      setBoatFire(n);
    }
  };

  let interval: NodeJS.Timeout;

  useEffect(() => {
    // GenerateShockValues
    generateShockValues()
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

    if (loading) {
        return <div>Loading...</div>
    }
    if (questionNumber >= questions.length) {
        localStorage.setItem("numShock", incorrectAnswers.toString());
        localStorage.setItem("numCorrect", (10 - incorrectAnswers).toString());
        router.push("/endscreen");
        return;
    }

    
    return (
        <div className="relative flex flex-col min-h-screen">
            <GameClouds />
            <header className="py-4 px-4 lg:px-6 h-14 grid grid-cols-3 text-3xl 
      font-bold tracking-tighter">
                <span></span>
                <h1 className="mx-auto text-red-300">{game.name}</h1>
                <h1 className="mx-auto text-red-500 text-xl tracking-normal">{`Question ${questionNumber}/10`}</h1>
            </header>
            <div className="absolute w-1/4 h-screen flex flex-col items-center">
                {isLightning && (
                    <Image
                        width={280}
                        alt="lightning" 
                        src={lightning}
                        className="absolute pl-5 h-3/4"
                    />
                )}
                <Image 
                    width={200} height={200} 
                    alt="sailboat" 
                    src={boatImages[boatFire]}
                    className={`w-full ${isShaking ? 'animate-shake' : ''}`}
                    style={{ marginTop: '66.66%' }}
                />
            </div>
            <main className="absolute grid grid-cols-4 mt-8 h-screen w-screen">
                <div>
                </div>
                <div className="col-span-2 mt-20">
                    {
                        !flipperPort && (
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
                        flipperPort && (
                            <>
                                <Card className={"rounded-xl shadow-lg transition-colors bg-white duration-500 " + 
                                    (showFeedback ? `${correct ? "bg-green-500" : "bg-red-500"} text-white` : "")}>
                                <CardContent className="relative p-6 flex flex-col items-center text-center transition-colors">
                                    {/* <CorrectOverlay correct={correct} show={showFeedback}/> */}
                                    <h1 className={`text-2xl font-bold tracking-tighter `}>
                                        {showFeedback ? (correct ? "Correct" : "Incorrect") : `${question.question}`}
                                    </h1>
                                </CardContent>
                                </Card>
                                <div className="grid grid-cols-2 grid-rows-2 mt-8 gap-8">
                                    <AnswerButton answer={question.options[0]} shockLevel={shockValues[0]} answerCallback={handleAnswer} />
                                    <AnswerButton answer={question.options[1]} shockLevel={shockValues[1]} answerCallback={handleAnswer} />
                                    <AnswerButton answer={question.options[2]} shockLevel={shockValues[2]} answerCallback={handleAnswer} />
                                    <AnswerButton answer={question.options[3]} shockLevel={shockValues[3]} answerCallback={handleAnswer} />
                                </div>
                            </>
                        ) 
                    }
                </div>
                {<TimerLightning startTime={startTime} remainingTime={timeLeft} paused={false} />}
            </main>
        </div>
    )
}
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, CheckCircle, Smartphone, Zap, Shield } from "lucide-react"
import Link from "next/link"
import GameClouds from "@/components/brainstorm/GameClouds"
import Image from "next/image"
import PirateShip from "@/assets/pirate_ship.png"

function AnswerButton(props: { answer: string }) {
    const { answer } = props
    return (
        <Button className="rounded-xl w-auto h-36 text-xl">
            {answer}
        </Button>
    )
}

export default function Component() {
  return (
    <div className="relative flex flex-col min-h-screen bg-white">
      <GameClouds className="opacity-50"/>
      <header className="py-4 px-4 lg:px-6 h-14 grid grid-cols-3 text-3xl 
      font-bold tracking-tighter">
        <span></span>
        <h1 className="mx-auto">A Stormy Day</h1>
        <h1 className="mx-auto text-xl tracking-normal">Question 1/10</h1>
      </header>
      <main className="flex mt-8">
        <div className="basis-1/4">
            <Image width={200} height={200} alt="pirate ship" src={PirateShip}
             className="w-full" />
        </div>
        <div className="basis-1/2">
            <Card className="rounded-xl shadow-lg">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                    <h1 className="text-2xl font-bold tracking-tighter">
                        What is the capital of France?
                    </h1>
                </CardContent>
            </Card>
            <div className="grid grid-cols-2 grid-rows-2 mt-8 gap-8">
                <AnswerButton answer="Paris" />
                <AnswerButton answer="London" />
                <AnswerButton answer="Berlin" />
                <AnswerButton answer="Madrid" />
            </div>
        </div>
        <div className="basis-1/4">

        </div>
      </main>
    </div>
  )
}
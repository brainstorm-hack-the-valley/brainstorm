'use client';
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, FileWarning } from "lucide-react";
import { Lightning, DangerTriangle } from "@mynaui/icons-react";
import { useRouter } from "next/navigation";

import Header from "@/components/ui/header"
import * as Game from "@/game/game"
import { Button } from "@/components/ui/button";

function handleClick(difficulty: string) {
  localStorage.setItem("difficulty", difficulty);
  console.log(localStorage.getItem("difficulty"));
}

export default function Page({ params }: { params: { mode: string } }) {
  const mode = params.mode;
  const gamemode = mode === Game.A_RAINY_DAY.getId() ? Game.A_RAINY_DAY : mode === Game.A_STORMY_NIGHTMARE.getId() ? Game.A_STORMY_NIGHTMARE : undefined
  if (!gamemode) {
    return redirect("/home");
  }
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      < Header />
      <div className="flex flex-col items-center justify-center">
      <div className="block mx-auto my-8 ">
        <h1 className="text-3xl font-bold w-full text-center">
          {gamemode.getName()}
        </h1>
        <div className="flex flex-row mx-auto mt-6 gap-8">
          {gamemode.getRules().map((rule, i) => (
            <div className="flex flex-row items-center gap-2" key={i}>
              <rule.icon className="w-10 h-10" />
              <p className="text-xl">{rule.description}</p>
            </div>
          ))}
        </div>
      </div>
      <Tabs className="mx-auto px-32 w-full" defaultValue={Game.EASY.getId()}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value={Game.PEACEFUL.getId()}>{Game.PEACEFUL.getName()}</TabsTrigger>
          <TabsTrigger value={Game.EASY.getId()}>{Game.EASY.getName()}</TabsTrigger>
          <TabsTrigger value={Game.MEDIUM.getId()}>{Game.MEDIUM.getName()}</TabsTrigger>
          <TabsTrigger value={Game.HARD.getId()}>{Game.HARD.getName()}</TabsTrigger>
        </TabsList>
        {[Game.PEACEFUL, Game.EASY, Game.MEDIUM, Game.HARD].map((difficulty) => (
          <TabsContent value={difficulty.getId()} key={difficulty.getId()}>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">{difficulty.getName()}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-row items-center gap-4">
                  <Clock className="w-8 h-8" />
                  <p>{gamemode == Game.A_RAINY_DAY ? "No time pressure" : difficulty.getTimer() + " seconds per question"}</p>
                </div>
                <div className="flex flex-row items-center gap-4 mt-4">
                  <Lightning className="w-8 h-8" />
                  <p>{difficulty.getShockLevel() == 0 ? "None" : difficulty.getShockLevel() < 20 ? "Light" : difficulty.getShockLevel() < 30 ? "Moderate" : "Heavy"}</p>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex flex-col w-full">
                  <div className="flex flex-row items-center gap-2">
                    < DangerTriangle className="w-6 h-6" />
                    <p className="text-sm">This educational process may cause some discomfort</p>
                  </div>
                  <Button className="mt-4 mx-auto align-middle w-1/12" onClick={() => { handleClick(difficulty.getId()); router.push("/game/" + mode) }}>
                    Start
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
    </div>
  )
}
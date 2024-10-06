"use client";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, CheckCircle, Smartphone, Zap, Shield, CloudLightning } from "lucide-react"
import Link from "next/link"
import Header from "@/components/ui/header"
import { useRouter } from "next/navigation";

export default function Component() {
  const router = useRouter();

  return (
  <div className="flex flex-col min-h-screen bg-white">
  <Header />
  <main className="h-full flex flex-1 items-center justify-center w-full">
    <section className="h-full w-full max-w-3xl flex flex-col items-center gap-y-10">
      <div className="flex flex-col justify-between items-center gap-y-10 text-center">
        <div className="flex flex-col justify-center items-center">
          <CloudLightning className="h-32 w-32 text-blue-500" />
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Welcome to Brainstorm
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
              Get ready for a shocking new learning experience.
            </p>
          </div>
        </div>
        <div className="w-full max-w-sm space-y-4">
          <div
            className={"group rounded-xl shadow-lg transform transition-transform " + 
                      "duration-300 hover:scale-105 hover:cursor-pointer"}
            onClick={() => router.push("/subject")}
          >
            <Card className="rounded-xl shadow-lg">
              <CardContent className="p-4 flex flex-col items-center text-center space-y-3">
                <Zap className="h-12 w-12 text-blue-500" />
                <h3 className="text-2xl font-bold">Get Started</h3>
                <p className="text-gray-500">
                  Participate in enlightenment- with a twist.
                </p>
              </CardContent>
            </Card>
          </div>
          <div>
            <p className="text-xs text-gray-500">
              Any injuries sustained from using Brainstorm are purely coincidental.
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
</div>


  )
}
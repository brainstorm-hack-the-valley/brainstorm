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
  <main className="flex flex-1 items-center justify-center w-full">
    <section className="w-full max-w-3xl py-6 md:py-12 lg:py-16 xl:py-20 flex flex-col items-center">
      <div className="w-full px-4 md:px-6">
        <div className="flex flex-col items-center space-y-3 text-center">
          <CloudLightning className="h-40 w-40 text-blue-500" />
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Welcome to Brainstorm
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
              Get ready for a shocking experience that you won't forget.
            </p>
          </div>
          <div className="w-full max-w-sm space-y-1">
            <div
              className="group rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105 hover:cursor-pointer"
              onClick={() => router.push("/subject")}
            >
              <Card className="rounded-xl shadow-lg">
                <CardContent className="p-4 flex flex-col items-center text-center space-y-3">
                  <Zap className="h-12 w-12 text-blue-500" />
                  <h3 className="text-2xl font-bold">Get Started</h3>
                  <p className="text-gray-500">
                    Participate in enlightenment with a twist.
                  </p>
                </CardContent>
              </Card>
            </div>
            <p className="text-xs text-gray-500">
              Any injuries sustained from using Brainstorm are purely coincidental.
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
  <footer className="flex flex-col gap-2 sm:flex-row py-4 w-full items-center px-4 md:px-6 border-t mt-auto">
    <p className="text-xs text-gray-500">© 2024 Brainstorm (Hack the Valley) Inc. All rights reserved.</p>
    <nav className="sm:ml-auto flex gap-4 sm:gap-6">
      <Link className="text-xs hover:underline underline-offset-4" href="#">
        Terms of Service
      </Link>
      <Link className="text-xs hover:underline underline-offset-4" href="#">
        Privacy
      </Link>
    </nav>
  </footer>
</div>


  )
}
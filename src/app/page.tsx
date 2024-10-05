import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, CheckCircle, Smartphone, Zap, Shield } from "lucide-react"
import Link from "next/link"

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <Smartphone className="h-6 w-6" />
          <span className="sr-only text-black">Brainstorm</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to Our Modern App
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Experience the future of mobile applications with our innovative solution.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1 bg-gray-100 rounded-full" placeholder="Enter your email" type="email" />
                  <Button className="rounded-full" type="submit">
                    Get Started
                  </Button>
                </form>
                <p className="text-xs text-gray-500">
                  Start your free trial. No credit card required.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 rounded-t-[40px]">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card className="rounded-xl shadow-lg">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <Zap className="h-12 w-12 text-blue-500" />
                  <h3 className="text-2xl font-bold">Lightning Fast</h3>
                  <p className="text-gray-500">Experience unparalleled speed and performance.</p>
                </CardContent>
              </Card>
              <Card className="rounded-xl shadow-lg">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <Shield className="h-12 w-12 text-green-500" />
                  <h3 className="text-2xl font-bold">Secure & Private</h3>
                  <p className="text-gray-500">Your data is protected with state-of-the-art encryption.</p>
                </CardContent>
              </Card>
              <Card className="rounded-xl shadow-lg">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <CheckCircle className="h-12 w-12 text-purple-500" />
                  <h3 className="text-2xl font-bold">Easy to Use</h3>
                  <p className="text-gray-500">Intuitive interface designed for the best user experience.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Ready to Transform Your Mobile Experience?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl">
                  Join thousands of satisfied users and take your mobile productivity to the next level.
                </p>
              </div>
              <Button className="rounded-full" size="lg">
                Download Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
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
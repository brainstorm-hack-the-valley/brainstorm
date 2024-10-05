
export default function CorrectOverlay({ correct, className }: { correct: boolean, className?: string }) {
    return (
        <div className={"absolute left-0 top-0 w-screen h-screen flex items-center justify-center " +
                        "transition-opacity " + className}>
            <div className={`${correct ? "bg-green-500" : "bg-red-500"} text-white text-4xl p-4 rounded-lg`}>
                {correct ? "Correct!" : "Incorrect!"}
            </div>
        </div>
    )
}
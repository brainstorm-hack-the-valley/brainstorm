
export default function CorrectOverlay({ correct, className, show }: 
                                       { correct: boolean, className?: string, show: boolean }) {
    className = show ? "opacity-100 " : "opacity-0 " + className
    return (
        <div className={"absolute top-0 left-0 w-full h-full opacity-50 " +
                        "transition-opacity z-10 pointer-events-none " + className}>
            <div className={`${correct ? "bg-green-500" : "bg-red-500"} text-white text-4xl p-4 rounded-lg`}>
                {correct ? "Correct!" : "Incorrect!"}
            </div>
        </div>
    )
}
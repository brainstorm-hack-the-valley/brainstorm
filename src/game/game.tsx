import { TimerIcon, XIcon, CloudLightningIcon } from "lucide-react"
import { ForwardRefExoticComponent } from "react"

class Rule {
    icon: ForwardRefExoticComponent<any>
    description: string
    constructor(icon: ForwardRefExoticComponent<any>, description: string) {
        this.icon = icon
        this.description = description
    }
}

export class BrainStormGamemode {
    id: string
    name: string
    image: string
    rules: Rule[]
    constructor(id: string, name: string, image: string, rules: Rule[]) {
        this.id = id
        this.name = name
        this.image = image
        this.rules = rules
    }

    getRules() {
        return this.rules
    }

    getImage() {
        return this.image
    }

    getId() {
        return this.id
    }

    getName() {
        return this.name
    }
}

export const A_RAINY_DAY = new BrainStormGamemode("a-rainy-day", "A Rainy Day", "rainy_day.png", 
    [new Rule(TimerIcon, "No time pressure."), new Rule(XIcon, "Incorrect answers intensify the storm.")])

export const A_STORMY_NIGHTMARE = new BrainStormGamemode("a-stormy-nightmare", "A Stormy Nightmare", "stormy_nightmare.png",
    [new Rule(TimerIcon, "You have 1-2 minutes to answer all the questions."), new Rule(CloudLightningIcon, "Running out of time might be shocking.")])

const ALL_GAMEMODES = [A_RAINY_DAY, A_STORMY_NIGHTMARE]

export function getGamemodeById(id: string) {
    return ALL_GAMEMODES.find(gamemode => gamemode.getId() === id)
}

export class BrainStormDifficulty {
    id: string
    name: string
    timer: number
    shock_level: number
    constructor(id: string, name: string, timer: number, shock_level: number) {
        this.id = id
        this.name = name
        this.timer = timer
        this.shock_level = shock_level
    }

    getId() {
        return this.id
    }

    getName() {
        return this.name
    }

    getTimer() {
        return this.timer
    }

    getShockLevel() {
        return this.shock_level
    }
}

export const PEACEFUL = new BrainStormDifficulty("peaceful", "Peaceful", 120, 0)
export const EASY = new BrainStormDifficulty("easy", "Easy", 90, 10)
export const MEDIUM = new BrainStormDifficulty("medium", "Medium", 60, 20)
export const HARD = new BrainStormDifficulty("hard", "Hard", 45, 30)

const ALL_DIFFICULTIES = [PEACEFUL, EASY, MEDIUM, HARD]

export function getDifficultyById(id: string) {
    return ALL_DIFFICULTIES.find(difficulty => difficulty.getId() === id)
}

export type BrainstormQuestion = {
    question: string
    options: string[]
    answer: string
}
import { sendFlipperCommand } from "@/flipper/flipper";
import { BrainStormDifficulty, BrainStormGamemode, PEACEFUL } from "@/game/game";

export function sendShock(port: any, gamemode: BrainStormGamemode, difficulty: BrainStormDifficulty, randShockLevel: number) {
    let vibrate = true;
    let shockLevel = randShockLevel

    // TODO: Remove this...
    if (difficulty.getId() !== PEACEFUL.getId()) {
        vibrate = false;
    }

    if (difficulty.getId() === PEACEFUL.getId()) {
        shockLevel = 0
    } else if (difficulty.getId() === "easy") {
        shockLevel = 3 * randShockLevel
    } else if (difficulty.getId() === "medium") {
        shockLevel = 5 * randShockLevel
    } else if (difficulty.getId() === "hard") {
        shockLevel = 10 * randShockLevel
    }
    const fl = Math.floor(shockLevel/5) * 5;
    const cl = Math.ceil(shockLevel/5) * 5;
    if (shockLevel - fl < cl - shockLevel) {
        shockLevel = fl;
    } else {
        shockLevel = cl;
    }

    const command = `subghz tx_from_file /ext/subghz/R1${vibrate ? 'V' : ''}${shockLevel}.sub 1 0`
    sendFlipperCommand(port, command)
}
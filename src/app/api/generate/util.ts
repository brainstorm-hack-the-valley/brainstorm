import { sendFlipperCommand } from "@/flipper/flipper";
import { BrainStormDifficulty, BrainStormGamemode, PEACEFUL } from "@/game/game";

export function sendShock(port: any, gamemode: BrainStormGamemode, difficulty: BrainStormDifficulty) {
    let shockLevel = difficulty.shock_level.toString().padStart(2, "0")
    let vibrate = difficulty == PEACEFUL

    // TODO: Remove this...
    shockLevel = "10"
    vibrate = true

    const command = `subghz tx_from_file /ext/subghz/R1${vibrate ? 'V' : ''}${shockLevel}.sub 1 0`
    sendFlipperCommand(port, command)
}
import { GameContext } from "@/contexts/GameContext"
import { useContext } from "react"

function useGameContext() {
    const game = useContext(GameContext)
    
    if (game === undefined) {
        throw new Error("UseGameContext must be used within a GameContext")
    }

    return game
}

export default useGameContext
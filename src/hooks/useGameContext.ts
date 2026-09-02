import { GameContext } from "@/contexts/GameContext"
import { useContext } from "react"

function useGameContext() {
    const gameContext = useContext(GameContext)
    
    if (gameContext === undefined) {
        throw new Error("UseGameContext must be used within a GameContext")
    }

    return gameContext
}

export default useGameContext
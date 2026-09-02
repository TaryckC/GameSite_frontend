import { fetchGame } from "@/routes/game/game";
import type { Game } from "@/types/game/Game";
import { createContext, useEffect, useState, type ReactNode } from "react";

// Declaring GameContext
export const GameContext = createContext<GameContextValue | undefined>(undefined)

// Creating GameContext provider
type GameProviderProps = { 
    children: ReactNode,
    gameId: number
}

type GameContextValue = {
    game: Game | undefined
    loadGame: (id: number) => void
}

export default function GameProvider({ children, gameId }: GameProviderProps) {
    const [game, setGame] = useState<Game | undefined>()

    useEffect(() => {
        if (!gameId === undefined)
            loadGame(gameId)
    }, [gameId, game])
 
    async function loadGame(id: number) {
        const data = await fetchGame(id)
        if (!data) {
            throw new Error("Could not fetch game. Id : " + id)
        }
        setGame(data)
    }

    const value: GameContextValue = {
        game: game,
        loadGame: loadGame
    }

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    )
}
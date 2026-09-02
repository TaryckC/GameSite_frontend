import { fetchGame, fetchMap, patchMap } from "@/routes/game/game";
import type { Game } from "@/types/game/Game";
import type { Map } from "@/types/game/Map";
import { createContext, useState, type ReactNode } from "react";

// Declaring GameContext
export const GameContext = createContext<GameContextValue | undefined>(undefined)

// Creating GameContext provider
type GameProviderProps = { 
    children: ReactNode,
    gameId: number
}

type GameContextValue = {
    gameId: number | undefined
    game: Game | undefined
    map: Map | undefined
    loadGame: (id: number) => void
    loadMap: () => void
    updateMap: (width: number, height: number) => void
}

export default function GameProvider({ children }: GameProviderProps) {
    const [game, setGame] = useState<Game>()
    const [map, setMap] = useState<Map>()
    const [gameId, setGameId] = useState<number>()
 
    async function loadGame(id: number) {
        const data = await fetchGame(id)
        if (!data) {
            throw new Error("Could not fetch game. Id : " + id)
        }
        setGame(data)
        setGameId(id)
    }

    async function loadMap() {
        if (gameId === undefined) {
            throw new Error("GameId is undefined, make sure to load a game before calling this method.")
        }

        const map = await fetchMap(gameId)

        if (!map) {
            throw new Error("Could not fetch map for given game id")
        }

        setMap(map)
    }

    async function updateMap(width: number, height: number) {
        if (gameId == undefined) {
            throw new Error("GameId is undefined, make sure to load a game before calling this method.")
        }

        const result = await patchMap(gameId, width, height)

        setMap(result)
    }

    const value: GameContextValue = {
        gameId: gameId,
        game: game,
        map: map,
        loadGame: loadGame,
        loadMap: loadMap,
        updateMap: updateMap
    }

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    )
}
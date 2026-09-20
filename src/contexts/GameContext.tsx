import { fetchGame, fetchMap, patchMap } from "@/routes/game/game";
import type { Game } from "@/types/game/Game";
import type { Map } from "@/types/game/Map";
import { useRef, useState, type ReactNode } from "react";
import { GameContext } from "./gameContextValue";

type GameProviderProps = { children: ReactNode }

export default function GameProvider({ children }: GameProviderProps) {
    const [game, setGame] = useState<Game>()
    const [map, setMap] = useState<Map>()
    const [gameId, setGameId] = useState<number>()
    const activeGameId = useRef<number | undefined>(undefined)
 
    async function loadGame(id: number) {
        activeGameId.current = id
        setMap(undefined)
        setGame(undefined)
        setGameId(undefined)
        const data = await fetchGame(id)
        if (activeGameId.current !== id) return
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

        if (activeGameId.current === gameId) setMap(map)
    }

    async function updateMap(width: number, height: number) {
        if (gameId == undefined) {
            throw new Error("GameId is undefined, make sure to load a game before calling this method.")
        }

        const result = await patchMap(gameId, width, height)

        if (activeGameId.current === gameId) setMap(result)
    }

    const value = {
        gameId: gameId,
        game: game,
        map: map,
        loadGame: loadGame,
        loadMap: loadMap,
        updateMap: updateMap,
    }

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    )
}
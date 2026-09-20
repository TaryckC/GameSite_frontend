import { createContext } from "react"
import type { Game } from "@/types/game/Game"
import type { Map } from "@/types/game/Map"

type GameContextValue = {
    gameId: number | undefined
    game: Game | undefined
    map: Map | undefined
    loadGame: (id: number) => Promise<void>
    loadMap: () => Promise<void>
    updateMap: (width: number, height: number) => Promise<void>
}

export const GameContext = createContext<GameContextValue | undefined>(undefined)

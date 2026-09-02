import type { Player } from "./Player"

export type Game = {
    id: number
    name: string
    maxPlayers: number
    created_at: string
    map: number
    playerList: Player[]
    isGameFinished: boolean
    currentPlayer: Player
}
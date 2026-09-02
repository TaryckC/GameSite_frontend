import type { Game } from "@/types/game/Game"

// TODO centralize this into a config file/ through launch parameter
const BACKEND_ADDRESS = "http://127.0.0.1:8000/"

export async function fetchGame(id: number): Promise<Game> {

    const url_paramters = id+"/"
    
    const response = await fetch(BACKEND_ADDRESS+"game/"+url_paramters)

    if (!response.ok) {
        throw new Error(`Http error. Status : ${response.ok}`)
    }

    const data: Game = await response.json()
    return data
}

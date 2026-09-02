import type { Game } from "@/types/game/Game"
import type { Map } from "@/types/game/Map"

// TODO centralize this into a config file/ through launch parameter
const BACKEND_GAME_ADDRESS = "http://127.0.0.1:8000/" + "game/"
const URL_MAP_SECTION = "map/"

// Fetches

export async function fetchGame(id: number): Promise<Game> {

    const url_paramters = id + "/"
    
    const response = await fetch(BACKEND_GAME_ADDRESS+url_paramters)

    if (!response.ok) {
        throw new Error(`Http error. Status : ${response.status}`)
    }

    const data: Game = await response.json()
    return data
}

export async function fetchMap(gameId: number): Promise<Map> {
    const url_paramters = gameId + "/"

    const response = await fetch(BACKEND_GAME_ADDRESS+url_paramters+"map")

    if (!response.ok) {
        throw new Error(`Http error while fetching map for ${gameId}. Status : ${response.status}`)
    }

    const data: Map = await response.json()
    return data
}


// Patches

export async function patchMap(gameId: number, width: number, height: number): Promise<Map> {
    const url_paramters = gameId + "/"
    const url = BACKEND_GAME_ADDRESS + url_paramters + URL_MAP_SECTION

    const response = await fetch(url, {
        method: "PATCH",
        body: JSON.stringify({
            width: width,
            height: height
        })
    })

    if (!response.ok) {
        throw new Error("HTTP error while patching map for " + gameId + ". Status : " + response.status)
    }

    const data: Map = await response.json()
    return data
}
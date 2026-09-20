import type { Case } from "@/types/game/Case"
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
    const url_parameters = gameId + "/"

    const response = await fetch(BACKEND_GAME_ADDRESS+url_parameters+URL_MAP_SECTION)

    if (!response.ok) {
        throw new Error(`Http error while fetching map for ${gameId}. Status : ${response.status}`)
    }

    const data: Map = await response.json()
    return data
}

export async function fetchCase(gameId: number, caseId: number): Promise<Case> {
    const url_parameters = gameId + "/" + "map/" + "case/" + caseId + "/"

    const response = await fetch(BACKEND_GAME_ADDRESS + url_parameters)

    if (!response.ok) {
        throw new Error(`Http error while fetching case for ${gameId} (gameId) and ${caseId} (caseId). Status : ${response.status}`)
    }

    const data: Case = await response.json()
    return data
}


// Patches

export async function patchMap(gameId: number, width: number, height: number): Promise<Map> {
    const url_paramters = gameId + "/"
    const url = BACKEND_GAME_ADDRESS + url_paramters + URL_MAP_SECTION

    const response = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            width: width,
            height: height
        })
    })

    if (!response.ok) {
        const details = await response.json().catch(() => null)
        throw new Error(details ? JSON.stringify(details) : `HTTP error: ${response.status}`)
    }

    const data: Map = await response.json()
    return data
}

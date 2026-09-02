
import useGameContext from "@/hooks/useGameContext"
import { useEffect, useRef, useState } from "react"
import './Game.css'

export default function Game() {
    const [formGameId, setFormGameId] = useState(2)
    const { game, loadGame} = useGameContext()

    

    return (
        <>
            <div className="game-attributes">
                <form action={
                    (formData) => {
                        const gameId = Number(formData.get("gameId"))
                        if (gameId) {
                        loadGame(gameId)}}
                    }
                >
                    <input value={formGameId} onChange={(e) => setFormGameId(Number(e.target.value))} name="gameId" type="number"/>
                    <button type="submit">Load Game</button>
                </form>

                {
                    game !== undefined &&
                    (
                        <div className="game-info">
                            {/* id: number
                            name: string
                            maxPlayers: number
                            created_at: string
                            map: number
                            playerList: Player[]
                            isGameFinished: boolean
                            currentPlayer: Player */}
                            {
                                <table>
                                    <thead>
                                        {Object.keys(game).map(([key, value]) => (
                                            <tr>
                                                <th key={key} scope="row">
                                                    {key}
                                                </th>
                                                <td>
                                                    {value}
                                                </td>
                                            </tr>
                                        ))}
                                    </thead>
                                </table>
                            }
                        </div>
                    )
                }
            </div>
        </>
    )
}
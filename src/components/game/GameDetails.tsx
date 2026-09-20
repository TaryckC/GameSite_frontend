import useGameContext from "@/hooks/useGameContext"
import "./GameDetails.css"

type GamedetailsProps = {
    default_form_id: number
}

function GameDetails({default_form_id}: GamedetailsProps) {
    const { game, loadGame} = useGameContext()

    return(
        <>
            <section className="game-attributes" aria-labelledby="game-details-title">
                <div className="game-details-heading">
                    <p className="game-details-eyebrow">Game lobby</p>
                    <h1 id="game-details-title">Game details</h1>
                    <p>Load a game to view its current configuration.</p>
                </div>

                <form className="game-loader" action={
                    (formData) => {
                        const gameId = Number(formData.get("gameId"))
                        if (gameId) {
                        loadGame(gameId)}}
                    }
                >
                    <label htmlFor="game-id">Game ID</label>
                    <div className="game-loader-controls">
                        <input id="game-id" name="gameId" type="number" min="1" defaultValue={default_form_id}/>
                        <button type="submit">Load game</button>
                    </div>
                </form>

                {
                    game !== undefined &&
                    (
                        <div className="game-info">
                            <div className="game-info-header">
                                <h2>Loaded game</h2>
                                <span>#{game.id}</span>
                            </div>
                            {
                                <table>
                                    <tbody>
                                        {Object.entries(game).map(([key, value]) => {
                                            return (
                                                <tr key={key}>
                                                    <th scope="row">
                                                        {key}
                                                    </th>
                                                    <td>
                                                        {String(value)}
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            }
                        </div>
                    )
                }
            </section>
        </>
    )
}

export default GameDetails

import useGameContext from "@/hooks/useGameContext"
import { useState } from "react"
import CaseComponent from "../case/Case"
import "./Map.css"

function Map() {
    const { gameId, map, loadMap, updateMap } = useGameContext()
    const [isMapDisplayed, setMapDisplay] = useState(false)
    const [pending, setPending] = useState(false)
    const [error, setError] = useState<string>()

    async function run(action: () => Promise<void>) {
        setPending(true)
        setError(undefined)
        try {
            await action()
        } catch (cause) {
            setError(cause instanceof Error ? cause.message : "Unable to update the map.")
        } finally {
            setPending(false)
        }
    }

    return (
        <section className="map-panel" aria-label="Game map" aria-busy={pending}>
            <div className="map-controls">
                <button disabled={gameId === undefined || pending} onClick={() => run(loadMap)}>
                    {pending ? "Loading…" : "Load map"}
                </button>
                <button disabled={!map} onClick={() => setMapDisplay(!isMapDisplayed)}>
                    {isMapDisplayed ? "Hide map" : "Display map"}
                </button>
            </div>
            {error && <p role="alert">{error}</p>}
            {map && (
                <>
                    <p>Map #{map.id} · {map.width} columns × {map.height} rows · {map.cases.length} cells</p>
                    <form key={`${map.id}-${map.width}-${map.height}`} onSubmit={(event) => {
                        event.preventDefault()
                        const data = new FormData(event.currentTarget)
                        void run(() => updateMap(Number(data.get("mapWidth")), Number(data.get("mapHeight"))))
                    }}>
                        <fieldset disabled={pending}>
                            <label htmlFor="map-width">Map width</label>
                            <input id="map-width" type="number" name="mapWidth" min="0" max="10000" step="1" required defaultValue={map.width} />
                            <label htmlFor="map-height">Map height</label>
                            <input id="map-height" type="number" name="mapHeight" min="0" max="10000" step="1" required defaultValue={map.height} />
                            <p>Up to 10,000 cells. Shrinking removes cells outside the new dimensions.</p>
                            <button type="submit">Resize map</button>
                        </fieldset>
                    </form>
                    {isMapDisplayed && (
                        map.width > 0 && map.height > 0 ? (
                            <div className="map-scroll">
                                <div className="map-grid" aria-label={`${map.width} by ${map.height} map`} style={{
                                    gridTemplateColumns: `repeat(${map.width}, 32px)`,
                                    gridTemplateRows: `repeat(${map.height}, 32px)`,
                                }}>
                                    {map.cases.map(cell => <CaseComponent key={cell.id} caseInfo={cell} />)}
                                </div>
                            </div>
                        ) : <p>The map is empty. Set its width and height to create cells.</p>
                    )}
                </>
            )}
        </section>
    )
}

export default Map

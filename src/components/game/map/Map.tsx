import useGameContext from "@/hooks/useGameContext"

function Map() {
    const {map, loadMap, updateMap} = useGameContext()

    return (
        <div>
            <div>
                <button 
                    type="submit"
                    onClick={() => loadMap()}
                >Load Map</button>
            </div>

            { map !== undefined && (
                <div>
                    <div>
                        <table>
                            <tbody>
                                {Object.entries(map).map(([key, value]) => {
                                    return (
                                        <tr>
                                            <th>
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
                    </div>

                    <div>
                        <form action={(formData) => {
                            updateMap(Number(formData.get("mapWidth")), Number(formData.get("mapHeight")))
                        }}>
                            <div>
                                <label>Mad Width</label>
                                <input type="number" name="mapWidth"/>
                            </div>
                            
                            <div>
                                <label>Map Height</label>
                                <input type="number" name="mapHeight"/>
                            </div>

                            <button type="submit">Update Map</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Map
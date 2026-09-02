import GameDetails from "@/components/game/GameDetails"
import Map from "@/components/game/map/Map"

export default function Game() {
    return (
        <>
            <div>
                <GameDetails default_form_id={1}/>
                <Map/>
            </div>
        </>
    )
}

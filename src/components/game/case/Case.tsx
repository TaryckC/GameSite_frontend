import type { Case } from "@/types/game/Case"
import "./Case.css"

type CaseProps = { caseInfo: Case }

function CaseComponent({ caseInfo }: CaseProps) {
    const label = `${caseInfo.title} (${caseInfo.x}, ${caseInfo.y}): ${caseInfo.description}`

    return (
        <div
            className="map-cell"
            role="img"
            aria-label={label}
            title={label}
            style={{
                gridColumn: caseInfo.x + 1,
                gridRow: caseInfo.y + 1,
                backgroundColor: caseInfo.color,
            }}
        />
    )
}

export default CaseComponent

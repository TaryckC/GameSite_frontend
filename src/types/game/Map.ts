import type { Case } from './Case'

export type Map = {
    id: number
    cases: Case[]
    playerPositions: Record<string, { x: number; y: number }>
    height: number
    width: number
}

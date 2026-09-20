export type Case = {
    id: number
    playerNumber: number
    maxPlayer: number
    map: number // Id
    height: number
    width: number
    x: number
    y: number
    color: string
    title: string
    description: string
    isTraversable: boolean
}

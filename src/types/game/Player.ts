import type { Item } from './Item'

export type Player = {
    id: number
    name: string
    health: number
    maxhealth: number
    gold: number
    itemList: Item[]
    // TODO : ItemUsage missing as I'm not sure if it's actually a good idea
}
export interface GameOptions {
	mapSize?: {
		x: number,
		y: number,
	}
	mapBoundarys?: Array<mapBoundary>
	players: Array<Player>
	friction: number,
}

export type mapBoundary =
	mapBoundaryCircle |
	mapBoundaryLine

export interface mapBoundaryLine {
	type: "line"
	x: number
	y: number
	x2: number
	y2: number
}
export interface mapBoundaryCircle {
	type: "circle"
	x: number
	y: number
	radius: number
}


export interface Player {
	x: number
	y: number
	color: string
	playericon: string
}

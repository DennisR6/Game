export interface Settings {
	mapBoundarys?: MapBoundary[];
	players?: Player[];
	friction?: number;
	effects?: Effect[];
	items?: any[];
	background?: Background;
}

export interface Background {
	type: string;
	url: string;
}

export interface Effect {
	type: string;
	value: number;
}

export type MapBoundaryType = "circle" | "line" | "rectangle"
export interface MapBoundary {
	type: MapBoundaryType;
	x: number;
	y: number;
}
export interface MapBoundaryCircle extends MapBoundary {
	r: number;
	color: string;
}
export interface MapBoundaryLine extends MapBoundary {
	x2: number;
	y2: number;
	color: string;
}
export interface MapBoundaryRect extends MapBoundary {
	w: number;
	h: number;
	color: string;
}

export interface Player {
	x: number;
	y: number;
	color: string;
	playericon: string;
}

export const defaultSettings: Settings = {
	mapBoundarys: [
		{ type: "circle", x: 100, y: 100, color: "green", r: 60 } as MapBoundaryCircle,
	],
	players: [
		{ x: 150, y: 150, color: "red", playericon: "" }
	]
}

export interface Settings {
	mapBoundarys?: MapBoundary[];
	players?: Entity[];
	friction?: number;
	effects?: Effect[];
	items?: any[];
	background?: Background;
	screenResolution: ScreenResolution;
}
export interface ScreenResolution {
	x: number,
	y: number,
	factor: number,
}
export type Background = BackgroundColor | BackgroundImage

export interface BackgroundImage {
	type: "image"
	url: string
}
export interface BackgroundColor {
	type: "color"
	color: string
}

export interface Effect {
	type: string;
	value: number;
}

export type MapBoundary = MapBoundaryCircle | MapBoundaryLine | MapBoundaryRect
export interface IMapBoundary {
	x: number;
	y: number;
}
export interface MapBoundaryCircle extends IMapBoundary {
	type: "circle"
	r: number;
	color: string;
}
export interface MapBoundaryLine extends IMapBoundary {
	type: "line"
	x2: number;
	y2: number;
	color: string;
}
export interface MapBoundaryRect extends IMapBoundary {
	type: "rectangle"
	w: number;
	h: number;
	color: string;
}

export interface Entity {
	x: number;
	y: number;
	color: string;
	team: string;
	playericon: string;
}

const thickness = 2
export default {
	screenResolution: { x: 100, y: 100, factor: 100 },
	mapBoundarys: [
		// Rectangles
		{ type: "rectangle", x: 160, y: 100, w: 180, h: thickness, color: "blue" },
		{ type: "rectangle", x: 460, y: 100, w: 180, h: thickness, color: "blue" },
		{ type: "rectangle", x: 100, y: 160, w: thickness, h: 280, color: "blue" },
		{ type: "rectangle", x: 700, y: 160, w: thickness, h: 280, color: "blue" },
		{ type: "rectangle", x: 160, y: 500, w: 180, h: thickness, color: "blue" },
		{ type: "rectangle", x: 460, y: 500, w: 180, h: thickness, color: "blue" },

		// Circles
		{ type: "circle", x: 100, y: 100, r: 30, color: "red" },
		// OBEN MITTE
		{ type: "circle", x: 400, y: 100, r: 30, color: "red" },
		// OBEN RECHTS
		{ type: "circle", x: 700, y: 100, r: 30, color: "red" },
		// UNTEN LINKS
		{ type: "circle", x: 100, y: 500, r: 30, color: "red" },
		// UNTEN MITTE
		{ type: "circle", x: 400, y: 500, r: 30, color: "red" },
		// UNTEN RECHTS
		{ type: "circle", x: 700, y: 500, r: 30, color: "red" },
	],
	players: [
		{ x: 300, y: 300, color: "green", playericon: "", team: "0" },
		{ x: 600, y: 300, color: "red", playericon: "", team: "1" },
	],
	friction: 0.95,
	items: [],
	background: { type: "color", color: "blue" },
} as Settings

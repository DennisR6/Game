import type { Drawer, RenderContext, Renderer } from "../engine/RenderContext";


// NOTE: das ist dein Interface (Vertrag) zum Code: 
// Versuche das zu Implementieren ohne eine Fehlermeldung zu bekommen.
// (Type Fehler darfst du haben).
// Falls du Fragen oder Fehler hast, kannst du sie der KI geben, dadurch 
// das wir hier in Typescript sind, und ich alles vordefiniert habe, 
// dürfte die Hilfe der KI deutich hilfreicher sein, wenn du ihr den Fehler gibst.
// bleibe bitte Anfangs bei der Color-Version und die Image Version machen wir dann gemeinsam,
// da ich glaube das es dafür noch einige Anpassungen am Renderer selbst 
// braucht um ihm zu sagen, das er es überhaupt kann. (Er kanns, er weiß es bloß aktuell noch nicht)
// Wenn du alles richtig gemacht hast, dann müsstest du einen blauen Hintergrund haben


export type IBackground = BackgroundColor | BackgroundImage
export interface BackgroundColor extends Drawer, Renderer {
	color: string
}

export interface BackgroundImage extends Drawer, Renderer {
	url: string
}

// --- ab hier darfst du dich austoben ---


export class BackgroundColor implements BackgroundColor {
	color: string

	constructor(bg: BackgroundColor) {
		this.color = bg.color
	}
	// NOTE: Das bleibt leer, es ist für zukünftige Animationen, aktuell uninteressant
	// im aktuellen Stadium des Projekts
	render(_deltatime: number): void { }
	draw(ctx: RenderContext): void {
		ctx.clear(this.color)
	}
}

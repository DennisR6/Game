import p5 from "p5";
import type { RenderContext } from "./RenderContext";

export class P5Renderer implements RenderContext {
	p5ctx: p5
	constructor(p: p5) {
		this.p5ctx = p
	}
	setFillColor(color: string): void {
		this.p5ctx.fill(color)
	}
	setStrokeColor(color: string): void {
		this.p5ctx.stroke(color)
	}
	drawImage(image: p5.Image, x: number, y: number, width: number, height: number) {
		this.p5ctx.image(image, x, y, width, height)
	}
	drawCircle(x: number, y: number, radius: number) {
		this.p5ctx.circle(x, y, radius * 2)
	}
	drawRect(x: number, y: number, width: number, height: number) {
		this.p5ctx.rect(x, y, width, height)
	}
	drawText(text: string, x: number, y: number, fontSize?: number) {
		this.p5ctx.textSize(fontSize || 12)
		this.p5ctx.text(text, x, y)
	}
	clear() {
		this.p5ctx.clear()
	}
}

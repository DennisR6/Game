import p5 from "p5";
import type { RenderContext } from "./RenderContext";

export class P5Renderer implements RenderContext {
	p5ctx: p5
	assets: Map<string, p5.Image>
	constructor(p: p5) {
		this.p5ctx = p
		this.assets = new Map<string, p5.Image>()
	}
	setFillColor(color: string): void {
		this.p5ctx.fill(color)
	}
	setStrokeColor(color: string): void {
		this.p5ctx.stroke(color)
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
	clear(color?: string): void {
		if (color) {
			this.setFillColor(color)
			this.p5ctx.rect(0, 0, this.p5ctx.width, this.p5ctx.height)
		}
		else this.p5ctx.clear()
	}
	loadImage(url: string): void {
		if (!this.assets.has(url)) {
			this.assets.set(url, new p5.Image(10, 10))
			this.p5ctx.loadImage(
				url,
				(img: p5.Image) => {
					this.assets.get(url)!.resize(img.width, img.height);
					this.assets.get(url)!.copy(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height)
				},
				() => { console.log("Error Loading from URL: " + url) }
			)
		}
	}
	drawImage(url: string, dx: number, dy: number, dWidth: number, dHeight: number, sx: number, sy: number, sWidth: number, sHeight: number): void {
		if (!this.assets.has(url)) {
			console.log(url + " is not loaded! Did you forgot to call loadImage(url)?\n loading it for you")
			this.loadImage(url)
			return
		}

		this.p5ctx.image(this.assets.get(url)!, dx, dy, dWidth, dHeight, sx, sy, sWidth, sHeight)
	}
	getScreenSize(): { width: number, height: number } {
		return {
			width: this.p5ctx.width,
			height: this.p5ctx.height
		}
	}
	setStroke(weight: number): void {
		this.p5ctx.stroke(weight)
	}
	rotate(deg: number): void {
		this.p5ctx.rotate(deg)
	}
}

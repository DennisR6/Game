import type { Drawer, RenderContext, Renderer } from "../engine/RenderContext"

export interface Structure extends Drawer {
	draw(ctx: RenderContext): void;
}
export class StructureCircle implements Structure {
	x: number
	y: number
	r: number
	color: string
	constructor(x: number, y: number, r: number, color: string) {
		this.x = x
		this.y = y
		this.r = r
		this.color = color || "green"
	}
	draw(ctx: RenderContext) {
		ctx.drawCircle(this.x, this.y, this.r * 2, this.color)
	}
}
export class StructureRectangle implements Structure {
	x: number
	y: number
	w: number
	h: number
	color: string
	constructor(x: number, y: number, w: number, h: number, color: string) {
		this.x = x
		this.y = y
		this.w = w
		this.h = h
		this.color = color || "green"
	}
	draw(ctx: RenderContext) {
		ctx.drawRect(this.x, this.y, this.w, this.h, this.color)
	}
}

export class StructureLine implements Structure {
	x: number
	y: number
	x2: number
	y2: number
	color: string
	constructor(x: number, y: number, x2: number, y2: number, color: string) {
		this.x = x
		this.x2 = x2
		this.y = y
		this.y2 = y2
		this.color = color || "green"
	}
	draw(ctx: RenderContext) {
		ctx.drawRect(this.x, this.y, this.x2, this.y2, this.color)
	}
}

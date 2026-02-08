import type { RenderContext } from "../engine/RenderContext"
import type { IStructure } from "./structures"

export class StructureRectangle implements IStructure {
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
		ctx.setFillColor(this.color)
		ctx.drawRect(this.x, this.y, this.w, this.h)
	}
}


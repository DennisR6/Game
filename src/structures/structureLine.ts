import type { RenderContext } from "../engine/RenderContext"
import type { IStructure } from "./structures"

export class StructureLine implements IStructure {
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
		ctx.setFillColor(this.color)
		ctx.drawRect(this.x, this.y, this.x2, this.y2)
	}
}

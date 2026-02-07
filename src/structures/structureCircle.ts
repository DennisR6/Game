import type { RenderContext } from "../engine/RenderContext"
import type { Structure } from "./structures"

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
		ctx.setFillColor(this.color)
		ctx.drawCircle(this.x, this.y, this.r * 2)
	}
}

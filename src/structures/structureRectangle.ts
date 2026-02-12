import type { RenderContext } from "../engine/RenderContext"
import type { IPhysicsRectangle, Vector2D } from "../physics/physics"
import type { IStructure } from "./structures"

export class StructureRectangle implements IStructure, IPhysicsRectangle {
	x: number
	y: number
	w: number
	h: number
	color: string
	shape: "rectangle"
	vel: Vector2D
	bounce: number
	inetia: number = 9000
	constructor(x: number, y: number, w: number, h: number, color: string) {
		this.x = x
		this.y = y
		this.w = w
		this.h = h
		this.color = color || "green"
		this.shape = "rectangle"
		this.vel = { x: 0, y: 0 }
		this.bounce = 0
	}
	draw(ctx: RenderContext) {
		ctx.setFillColor(this.color)
		ctx.drawRect(this.x, this.y, this.w, this.h)
	}
	getBounceFactor(): number {
		return this.bounce
	}
	getBounds(): { width: number; height: number } {
		return { width: this.w, height: this.h }
	}
	getPos(): Vector2D {
		return { x: this.x, y: this.y }
	}
	getVelocity(): Vector2D {
		return this.vel
	}
	onCollision(_impact: { newPos: Vector2D; newVel: Vector2D }): void {
		// NOTE: Do Noting - see StructureCircle
	}
	setVel(_vel: Vector2D): void {
		//NOTE: THIS Wall is not Moving? Maybe in a other Update?
	}
	setInertia(_inertia: number): void {
		//NOTE: THIS Wall is not Moving? Maybe in a other Update?
	}
	getInertia(): number {
		return this.inetia
	}
}

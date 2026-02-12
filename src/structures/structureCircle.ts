import type { RenderContext } from "../engine/RenderContext"
import type { IPhysicsCircle, Vector2D } from "../physics/physics"
import type { IStructure } from "./structures"

export class StructureCircle implements IStructure, IPhysicsCircle {
	x: number
	y: number
	r: number
	color: string
	shape: "circle"
	bounce: number
	vel: Vector2D
	inetia: number = 9000;
	constructor(x: number, y: number, r: number, color: string) {
		this.shape = "circle"
		this.x = x
		this.y = y
		this.r = r
		this.color = color || "green"
		this.bounce = 1
		this.vel = { x: 0, y: 0 }
	}
	draw(ctx: RenderContext) {
		ctx.setFillColor(this.color)
		ctx.drawCircle(this.x, this.y, this.r * 2)
	}
	getBounceFactor(): number {
		return this.bounce
	}
	getBounds(): { radius: number } {
		return { radius: this.r }
	}
	getPos(): Vector2D {
		return { x: this.x, y: this.y }
	}
	getVelocity(): Vector2D {
		return this.vel
	}
	setVel(vel: Vector2D): void {
		//NOTE: THIS Wall is not Moving? Maybe in a other Update?
	}
	setInertia(_inertia: number): void {
		//NOTE: THIS Wall is not Moving? Maybe in a other Update?
	}
	onCollision(_impact: { newPos: Vector2D; newVel: Vector2D }): void {
		// NOTE: This is a Wall: Do Nothing (infinite Mass)
	}
	getInertia(): number {
		return this.inetia
	}
}

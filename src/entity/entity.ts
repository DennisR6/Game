import type { Drawer, RenderContext, Renderer } from "../engine/RenderContext";
import type { IPhysicsCircle, Vector2D } from "../physics/physics";

export interface IEntity extends Drawer, Renderer, IPhysicsCircle {
	position: Vector2D
}

export class Player implements IEntity {
	position: Vector2D
	team: string;
	color: string;
	playericon: string;
	id: number;
	shape: "circle";
	velocity: Vector2D;
	bouncyness: number;
	friction: number;
	weight: number
	inertia: number = 1;
	constructor(x: number, y: number, team: string, color: string, playericon: string, id?: number) {
		this.position = { x, y }
		this.team = team
		this.color = color
		this.playericon = playericon
		this.id = id || 0
		this.shape = "circle"
		// NOTE: This if is only for tests to "crash" the first entity into the second player and the wall
		if (id == 0) {
			this.velocity = { x: 100, y: 1 } as Vector2D
		} else {
			this.velocity = { x: 0, y: 0 } as Vector2D
		}
		this.bouncyness = 0.1
		this.friction = 1;
		this.weight = 1
	}
	draw(ctx: RenderContext): void {
		ctx.setFillColor(this.color)
		ctx.drawCircle(this.position.x, this.position.y, 12)
	}
	render(deltaTime: number): void {
		const dt = deltaTime / 1000;
		this.position.x += this.velocity.x / this.inertia * dt;
		this.position.y += this.velocity.y / this.inertia * dt;

		this.velocity.x *= Math.pow(this.friction, dt);
		this.velocity.y *= Math.pow(this.friction, dt);
	}
	getBounds(): { radius: number; } {
		return { radius: 12 }
	}
	getPos(): Vector2D {
		return this.position
	}
	getVelocity(): Vector2D {
		return this.velocity
	}
	onCollision(_impact: { newPos: Vector2D; newVel: Vector2D; }): void {
		// TODO: needs implementation: or maybe not?
	}
	getBounceFactor(): number {
		return this.bouncyness
	}
	setInertia(inertia: number): void {
		this.inertia = Math.min(inertia, 1)
	}
	setVel(vel: Vector2D): void {
		this.velocity = vel
	}
	getInertia(): number {
		return this.inertia
	}
	setPos(pos: Vector2D): void {
		this.position = pos
	}
}

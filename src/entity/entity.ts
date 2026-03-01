import type { Drawer, RenderContext, Renderer } from "../engine/RenderContext";
import type { IPhysics, IPhysicsCircle, Vector2D } from "../physics/physics";

export interface IEntity extends Drawer, Renderer, IPhysicsCircle {
	position: Vector2D
}

const dottedLinecfg = {
	distance: 10,
	width: 10,
	height: 10,
	amount: 7,
};
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
	mass: number = 1;
	constructor(x: number, y: number, team: string, color: string, playericon: string, id?: number) {
		this.position = { x, y }
		this.team = team
		this.color = color
		this.playericon = playericon
		this.id = id || 0
		this.shape = "circle"
		// NOTE: This if is only for tests to "crash" the first entity into the second player and the wall
		this.velocity = { x: 0, y: 0 } as Vector2D
		if (id == 0) this.velocity = { x: 100, y: -5 } as Vector2D
		this.bouncyness = 0.1
		this.friction = 1;
		this.weight = 1
	}
	draw(ctx: RenderContext): void {
		ctx.setFillColor(this.color)
		ctx.drawCircle(this.position.x, this.position.y, 12)
		{
			ctx.push()
			const angle = Math.atan2(this.velocity.y, this.velocity.x)
			if (angle === 0) return
			ctx.translate(this.position.x, this.position.y)
			ctx.rotate(angle)
			for (let index = 0; index < dottedLinecfg.amount; index++) {
				if (index < 7) ctx.setFillColor("blue")
				if (index < 6) ctx.setFillColor("green")
				if (index < 4) ctx.setFillColor("yellow")
				if (index < 2) ctx.setFillColor("red")
				ctx.drawRect(index * (dottedLinecfg.distance + dottedLinecfg.width), -5, 10, 10)
			}
			ctx.pop()
		}
	}
	render(deltaTime: number): void {
		const dt = deltaTime / 1000;
		this.position.x += this.velocity.x / this.mass * dt;
		this.position.y += this.velocity.y / this.mass * dt;

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
	getBounceFactor(): number {
		return this.bouncyness
	}
	setVel(vel: Vector2D): void {
		this.velocity = vel
	}
	getMass(): number {
		return this.mass
	}
	setMass(inertia: number): void {
		this.mass = Math.min(inertia, 1)
	}
	setPos(pos: Vector2D): void {
		this.position = pos
	}
	onCollision({ entity }: { entity: IPhysics; }): void {
		console.log(entity)
	}
	getFriction(): number {
		return this.friction
	}
	setFriction(friction: number): void {
		this.friction = friction
	}
}

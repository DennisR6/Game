import type { Drawer, RenderContext, Renderer } from "../engine/RenderContext";
import type { IPhysicsCircle, Vector2D } from "../physics/physics";

export interface IEntity extends Drawer, Renderer, IPhysicsCircle {
	x: number;
	y: number;
}

export class Player implements IEntity {
	position: Vector2D
	team: number;
	color: string;
	playericon: string;
	id: number;
	shape: "circle";
	velocity: Vector2D;
	bouncyness: number;
	friction: number;
	constructor(x: number, y: number, team: number, color: string, playericon: string, id?: number) {
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
		this.friction = 0.95;
	}
	draw(ctx: RenderContext): void {
		ctx.setFillColor(this.color)
		ctx.drawCircle(this.position.x, this.position.y, 12)
	}
	render(deltaTime: number): void {
		const dt = deltaTime / 1000;
		this.position.x += this.velocity.x * dt;
		this.position.y += this.velocity.y * dt;

		// Optionale Reibung (Friction): Der Player wird mit der Zeit langsamer
		// z.B. 5% Geschwindigkeitsverlust pro Sekunde
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
		// TODO: needs implementation
	}
	getBounceFactor(): number {
		return this.bouncyness
	}
}

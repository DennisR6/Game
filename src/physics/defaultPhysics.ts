import type { IPhysics, IPhysicsCircle, IPhysicsRectangle, PhysicsStrategy, Vector2D } from "./physics";
export class defaultPhysics implements PhysicsStrategy {
	calculateBounce(vel: Vector2D, normal: Vector2D): Vector2D {
		const n = this.normalize(normal)
		const dot = this.dot(vel, normal)
		return this.sub(vel, this.mult(n, 2 * dot))
	}
	add(a: Vector2D, b: Vector2D) {
		return { x: a.x + b.x, y: a.y + b.y };
	}
	sub(a: Vector2D, b: Vector2D) {
		return { x: a.x - b.x, y: a.y - b.y };
	}
	mult(a: Vector2D, scalar: number) {
		return { x: a.x * scalar, y: a.y * scalar };
	}
	dot(a: Vector2D, b: Vector2D) {
		return a.x * b.x + a.y * b.y;
	}
	magSq(v: Vector2D) {
		return v.x * v.x + v.y * v.y;
	}
	mag(v: Vector2D) {
		return Math.sqrt(v.x * v.x + v.y * v.y);
	}
	normalize(v: Vector2D) {
		const m = Math.sqrt(v.x * v.x + v.y * v.y);
		return m === 0 ? { x: 0, y: 0 } : { x: v.x / m, y: v.y / m };
	}
	dist(a: Vector2D, b: Vector2D): number {
		const dx = a.x - b.x;
		const dy = a.y - b.y;
		return Math.sqrt(dx * dx + dy * dy);
	}
	distSq(a: Vector2D, b: Vector2D): number {
		const dx = a.x - b.x;
		const dy = a.y - b.y;
		return dx * dx + dy * dy;
	}
	clamp(val: number, min: number, max: number): number {
		return Math.max(min, Math.min(max, val))
	}
	checkCollision(entityA: IPhysics, entityB: IPhysics): boolean {
		switch (true) {
			case entityA.shape == "circle" && entityB.shape == "circle":
				return this.checkCollisionCircles(entityA, entityB)
			case entityA.shape == "circle" && entityB.shape == "rectangle":
				return this.checkCollisionCircleRect(entityA, entityB)
			case entityA.shape == "rectangle" && entityB.shape == "rectangle":
				return this.checkCollisionRects(entityA, entityB)
		}
		return false
	}
	checkCollisionCircles(entityA: IPhysicsCircle, entityB: IPhysicsCircle): boolean {
		const d2 = this.distSq(entityA.getPos(), entityB.getPos());
		const rSum = entityA.getBounds().radius + entityB.getBounds().radius;
		return d2 <= (rSum * rSum);
	}
	checkCollisionRects(entityA: IPhysicsRectangle, entityB: IPhysicsRectangle): boolean {
		const { x: Ax, y: Ay } = entityA.getPos()
		const { x: Bx, y: By } = entityB.getPos()
		return Ax <= Bx + entityB.getBounds().width &&
			Ax + entityA.getBounds().width >= Bx &&
			Ay <= By + entityB.getBounds().height &&
			Ay + entityA.getBounds().height >= By;
	}
	checkCollisionCircleRect(entityA: IPhysicsCircle, entityB: IPhysicsRectangle): boolean {
		const { x: Ax, y: Ay } = entityA.getPos()
		const { x: Bx, y: By } = entityB.getPos()
		const closest = {
			x: this.clamp(Ax, Bx, Bx + entityB.getBounds().width),
			y: this.clamp(Ay, By, By + entityB.getBounds().height)
		};
		const d2 = this.distSq(entityA.getPos(), closest);
		return d2 <= (entityA.getBounds().radius * entityA.getBounds().radius);
	}
	handleCollision(entityA: IPhysics, entityB: IPhysics): void {
		// NOTE: extremly naive implementation!
		// Stays put if you collide with a wall
		const { x: Ax, y: Ay } = entityA.getPos()
		const { x: Bx, y: By } = entityB.getVelocity()

		switch (true) {
			case (entityA.shape === "circle" && entityB.shape === "circle"): {
				const dx = (Ax + entityA.getBounds().radius) - (Bx + entityB.getBounds().radius);
				const dy = (Ay + entityA.getBounds().radius) - (By + entityB.getBounds().radius);

				entityA.setVel({ x: -dx, y: -dy })
				entityB.setVel({ x: dx, y: dy })
				break
			}
			case (entityA.shape === "rectangle" && entityB.shape === "circle"):
			case (entityA.shape === "circle" && entityB.shape === "rectangle"): {
				entityA.setVel({ x: 0, y: 0 })
				entityB.setVel({ x: 0, y: 0 })
			}
		}
	}
}

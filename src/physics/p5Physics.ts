import type { IPhysicsCircle, IPhysicsRectangle, PhysicsStrategy, Vector2D } from "./physics";
export class p5Physics implements PhysicsStrategy {
	calculateBounce(vel: Vector2D, normal: Vector2D): Vector2D | null {
		const dot = vel.x * normal.x + vel.y * normal.y;
		if (dot > 0) return vel;
		const factor = 2.0;
		return {
			x: vel.x - factor * dot * normal.x,
			y: vel.y - factor * dot * normal.y
		};
	}
	solveCircleRect(circle: IPhysicsCircle, rect: IPhysicsRectangle) {
		const cPos = circle.getPos();
		const rPos = rect.getPos();
		const rBounds = rect.getBounds();
		const closestX = Math.max(rPos.x, Math.min(cPos.x, rPos.x + rBounds.width));
		const closestY = Math.max(rPos.y, Math.min(cPos.y, rPos.y + rBounds.height));
		const distanceX = cPos.x - closestX;
		const distanceY = cPos.y - closestY;
		const distanceSq = (distanceX * distanceX) + (distanceY * distanceY);

		const radius = circle.getBounds().radius;

		if (distanceSq < (radius * radius)) {
			const dist = Math.sqrt(distanceSq);
			const normal = {
				x: distanceX / dist,
				y: distanceY / dist
			};
			return {
				newPos: {
					x: closestX + normal.x * radius,
					y: closestY + normal.y * radius
				},
				newVel: this.calculateBounce(circle.getVelocity(), normal)
			};
		}

		return null;
	}
}

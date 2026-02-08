import type { PhysicsStrategy, Vector2D } from "./physics";
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

	checkCollisionCircles(pos1: Vector2D, r1: number, pos2: Vector2D, r2: number): boolean {
		const d2 = this.distSq(pos1, pos2);
		const rSum = r1 + r2;
		return d2 <= (rSum * rSum);
	}
	checkCollisionRects(pos1: Vector2D, w1: number, h1: number, pos2: Vector2D, w2: number, h2: number): boolean {
		return pos1.x <= pos2.x + w2 &&
			pos1.x + w1 >= pos2.x &&
			pos1.y <= pos2.y + h2 &&
			pos1.y + h1 >= pos2.y;
	}
	checkCollisionCircleRect(circlePos: Vector2D, r: number, rectPos: Vector2D, w: number, h: number): boolean {
		const closest = {
			x: this.clamp(circlePos.x, rectPos.x, rectPos.x + w),
			y: this.clamp(circlePos.y, rectPos.y, rectPos.y + h)
		};
		const d2 = this.distSq(circlePos, closest);
		return d2 <= (r * r);
	}
}

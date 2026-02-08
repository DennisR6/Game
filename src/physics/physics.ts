export { defaultPhysics } from "./defaultPhysics.ts"
export interface Vector2D {
	x: number;
	y: number;
}
export interface PhysicsStrategy {
	calculateBounce(vel: Vector2D, normal: Vector2D): Vector2D;
	add(a: Vector2D, b: Vector2D): Vector2D
	sub(a: Vector2D, b: Vector2D): Vector2D
	mult(a: Vector2D, b: number): Vector2D
	dot(a: Vector2D, b: Vector2D): number
	magSq(v: Vector2D): number
	mag(v: Vector2D): number
	normalize(v: Vector2D): Vector2D
	dist(a: Vector2D, b: Vector2D): number;
	distSq(a: Vector2D, b: Vector2D): number;
	clamp(val: number, min: number, max: number): number
	//Collisions
	checkCollisionCircles(pos1: Vector2D, r1: number, pos2: Vector2D, r2: number): boolean;
	checkCollisionRects(pos1: Vector2D, w1: number, h1: number, pos2: Vector2D, w2: number, h2: number): boolean;
	checkCollisionCircleRect(circlePos: Vector2D, r: number, rectPos: Vector2D, w: number, h: number): boolean;
}
export type IPhysics = IPhysicsCircle | IPhysicsRectangle
export interface IPhysicsCircle {
	shape: "circle"
	getPos(): Vector2D;
	getVelocity(): Vector2D;
	onCollision(impact: { newPos: Vector2D, newVel: Vector2D }): void
	getBounds(): { radius: number }
	getBounceFactor(): number;
}
export interface IPhysicsRectangle {
	shape: "rectangle"
	getPos(): Vector2D;
	getVelocity(): Vector2D;
	onCollision(impact: { newPos: Vector2D, newVel: Vector2D }): void
	getBounds(): { width: number, height: number }
	getBounceFactor(): number;
}




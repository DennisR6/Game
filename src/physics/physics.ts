export interface Vector2D {
	x: number;
	y: number;
}
export interface PhysicsStrategy {
	calculateBounce(vel: Vector2D, normal: Vector2D): Vector2D | null;
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



export { p5Physics } from "./p5Physics.ts"

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
	checkCollisionCircles(entityA: IPhysicsCircle, entityB: IPhysicsCircle): boolean;
	checkCollisionRects(entityA: IPhysicsRectangle, entityB: IPhysicsRectangle): boolean;
	checkCollision(entityA: IPhysics, entityB: IPhysics): boolean
	checkCollisionCircleRect(entityA: IPhysicsCircle, entityB: IPhysicsRectangle): boolean;
	handleCollision(entityA: IPhysics, entityB: IPhysics): void
}
export type IPhysics = IPhysicsCircle | IPhysicsRectangle
export interface IdefaultPhysics {
	shape: string
	setVel(vel: Vector2D): void;
	setMass(mass: number): void;
	setPos(pos: Vector2D): void
	getPos(): Vector2D;
	getFriction(): number;
	setFriction(friction: number): void;
	getMass(): number
	getVelocity(): Vector2D;
	onCollision({ entity }: { entity: IPhysics }): void
	getBounceFactor(): number;
}
export interface IPhysicsCircle extends IdefaultPhysics {
	shape: "circle"
	getBounds(): { radius: number }
}
export interface IPhysicsRectangle extends IdefaultPhysics {
	shape: "rectangle"
	getBounds(): { width: number, height: number }
}




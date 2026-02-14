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
			case entityA.shape == "rectangle" && entityB.shape == "circle":
				return this.checkCollisionCircleRect(entityB, entityA)
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
		const posA = entityA.getPos();
		const posB = entityB.getPos();
		const dist = this.dist(posA, posB);

		switch (true) {
			case (entityA.shape === "circle" && entityB.shape === "circle"): {
				const radiusA = entityA.getBounds().radius;
				const radiusB = entityB.getBounds().radius;


				if (dist < radiusA + radiusB) {
					// 1. Kollisions-Normale (Wohin zeigt der Aufprall?)
					const nx = (posB.x - posA.x) / dist;
					const ny = (posB.y - posA.y) / dist;

					// 2. Relative Geschwindigkeit
					const velA = entityA.getVelocity();
					const velB = entityB.getVelocity();
					const relVelX = velB.x - velA.x;
					const relVelY = velB.y - velA.y;

					// 3. Wie stark prallen sie ab? (Skalarprodukt)
					const dotProduct = relVelX * nx + relVelY * ny;

					// Verhindern, dass sie zusammenkleben, wenn sie sich bereits voneinander entfernen
					if (dotProduct > 0) return;

					// 4. Impuls berechnen (vereinfacht ohne Masse für den Anfang)
					const restitution = Math.min(entityA.getBounceFactor(), entityB.getBounceFactor());
					const impulseMag = -(1 + restitution) * dotProduct;

					// Hier kommt deine Inertia (Masse) ins Spiel!
					const invMassA = 1 / entityA.getMass();
					const invMassB = 1 / entityB.getMass();

					// 5. Neue Geschwindigkeiten setzen
					entityA.setVel({
						x: velA.x - (impulseMag * nx * invMassA),
						y: velA.y - (impulseMag * ny * invMassA)
					});
					entityB.setVel({
						x: velB.x + (impulseMag * nx * invMassB),
						y: velB.y + (impulseMag * ny * invMassB)
					});
				}
				break
			}
			case (entityA.shape === "rectangle" && entityB.shape === "rectangle"): {
				// 2 Rectangles
				break
			}
			case (entityA.shape === "circle" && entityB.shape === "rectangle"):
			case (entityA.shape === "rectangle" && entityB.shape === "circle"): {
				const circle = (entityA.shape === "circle" ? entityA : entityB) as IPhysicsCircle
				const rectangle = (entityA.shape === "rectangle" ? entityA : entityB) as IPhysicsRectangle
				const cPos = circle.getPos();
				const rPos = rectangle.getPos();
				const rBounds = rectangle.getBounds();
				const radius = circle.getBounds().radius;

				const closestX = Math.max(rPos.x, Math.min(cPos.x, rPos.x + rBounds.width));
				const closestY = Math.max(rPos.y, Math.min(cPos.y, rPos.y + rBounds.height));

				const dx = cPos.x - closestX;
				const dy = cPos.y - closestY;
				const distanceSq = dx * dx + dy * dy;

				if (distanceSq < radius * radius) {
					const distance = Math.sqrt(distanceSq);

					const nx = distance > 0 ? dx / distance : 0;
					const ny = distance > 0 ? dy / distance : -1;

					const overlap = radius - distance;
					circle.setPos({
						x: cPos.x + nx * (overlap + 0.01), // Schiebt ihn minimal weiter raus
						y: cPos.y + ny * (overlap + 0.01)
					});

					const vel = circle.getVelocity();

					const dot = vel.x * nx + vel.y * ny;

					if (dot < 0) {
						const bounce = circle.getBounceFactor();

						// Formel für Reflexion: v_neu = v_alt - (1 + bounce) * (v_alt · n) * n
						circle.setVel({
							x: vel.x - (1 + bounce) * dot * nx,
							y: vel.y - (1 + bounce) * dot * ny
						});
					}

					circle.setPos(circle.getPos())
					circle.setVel(circle.getVelocity())
					rectangle.setPos(rectangle.getPos())
					rectangle.setVel(rectangle.getVelocity())

					circle.onCollision({ entity: rectangle })
					rectangle.onCollision({ entity: circle })
				}
			}
		}
	}
}

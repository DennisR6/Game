import { test, describe } from "node:test";
import { defaultPhysics } from "../src/physics/defaultPhysics"
import assert from "node:assert";

export function Test_Physics() {
	describe("Physics Calculations", (_suite) => {
		const physics = new defaultPhysics()
		test('Addition', () => {
			const a = { x: 1, y: 2 }
			const b = { x: 3, y: 4 }
			const result = physics.add(a, b)
			assert.deepStrictEqual(result, { x: 4, y: 6 })
		});

		test('Subtraction', () => {
			const a = { x: 10, y: 5 }
			const b = { x: 3, y: 2 }
			const result = physics.sub(a, b);
			assert.deepStrictEqual(result, { x: 7, y: 3 })
		});

		test('Multiplication (Scalar)', () => {
			const v = { x: 2, y: -3 }
			const result = physics.mult(v, 3)
			assert.deepStrictEqual(result, { x: 6, y: -9 })
		});

		test('Dot Product', () => {
			const a = { x: 1, y: 0 };
			const b = { x: 0, y: 1 };
			const result = physics.dot(a, b);

			assert.strictEqual(result, 0);
		});
		test('Distanz-Berechnung', () => {
			const p1 = { x: 10, y: 10 };
			const p2 = { x: 13, y: 14 };

			assert.strictEqual(physics.distSq(p1, p2), 25);
			assert.strictEqual(physics.dist(p1, p2), 5);
		});
		test('Clamp-Test', () => {
			{
				const result = physics.clamp(50, 100, 200)
				assert.strictEqual(result, 100)
			}
			{
				const result = physics.clamp(150, 100, 200)
				assert.strictEqual(result, 150)
			}
			{
				const result = physics.clamp(300, 100, 200)
				assert.strictEqual(result, 200)
			}
		})


		test("Collision-Circle", () => {
			{ // Komplette Überlappung
				const result = physics.checkCollisionCircles({ x: 0, y: 0 }, 60, { x: 0, y: 0 }, 60)
				assert.strictEqual(result, true)
			}
			{ // Teilweise Überlappung rechts
				const result = physics.checkCollisionCircles({ x: 0, y: 0 }, 60, { x: 30, y: 0 }, 60)
				assert.strictEqual(result, true)
			}
			{ // Teilweise Überlappung links
				const result = physics.checkCollisionCircles({ x: 30, y: 0 }, 60, { x: 0, y: 0 }, 60)
				assert.strictEqual(result, true)
			}
			{ // Teilweise Überlappung oben
				const result = physics.checkCollisionCircles({ x: 0, y: 30 }, 60, { x: 0, y: 0 }, 60)
				assert.strictEqual(result, true)
			}
			{ // Teilweise Überlappung unten
				const result = physics.checkCollisionCircles({ x: 0, y: 0 }, 60, { x: 0, y: 30 }, 60)
				assert.strictEqual(result, true)
			}
			{ // keine Überlappung rechts
				const result = physics.checkCollisionCircles({ x: 0, y: 0 }, 60, { x: 121, y: 0 }, 60)
				assert.strictEqual(result, false)
			}
			{ // keine Überlappung links
				const result = physics.checkCollisionCircles({ x: 121, y: 0 }, 60, { x: 0, y: 0 }, 60)
				assert.strictEqual(result, false)
			}
			{ // keine Überlappung diagonal rechts-oben
				const result = physics.checkCollisionCircles({ x: 0, y: 0 }, 60, { x: 90, y: 90 }, 60)
				assert.strictEqual(result, false)
			}
			{ // keine Überlappung diagonal rechts-oben
				const result = physics.checkCollisionCircles({ x: 0, y: 0 }, 60, { x: 80, y: 80 }, 60)
				assert.strictEqual(result, true)
			}
			{ // Exakte Berührung (Kante an Kante)
				const result = physics.checkCollisionCircles({ x: 0, y: 0 }, 60, { x: 120, y: 0 }, 60)
				assert.strictEqual(result, true)
			}
		});
		test("Collision-Rectangle", () => {
			{ // Komplette Überlappung
				const result = physics.checkCollisionRects({ x: 0, y: 0 }, 50, 50, { x: 0, y: 0 }, 50, 50)
				assert.strictEqual(result, true)
			}
			{ // Teilweise Überlappung rechts
				const result = physics.checkCollisionRects({ x: 0, y: 0 }, 50, 50, { x: 25, y: 0 }, 50, 50)
				assert.strictEqual(result, true)
			}
			{ // Teilweise Überlappung links
				const result = physics.checkCollisionRects({ x: 25, y: 0 }, 50, 50, { x: 0, y: 0 }, 50, 50)
				assert.strictEqual(result, true)
			}
			{ // Teilweise Überlappung oben
				const result = physics.checkCollisionRects({ x: 0, y: 0 }, 50, 50, { x: 0, y: 25 }, 50, 50)
				assert.strictEqual(result, true)
			}
			{ // Teilweise Überlappung unten
				const result = physics.checkCollisionRects({ x: 0, y: 25 }, 50, 50, { x: 0, y: 0 }, 50, 50)
				assert.strictEqual(result, true)
			}
			{ // keine Überlappung rechts
				const result = physics.checkCollisionRects({ x: 51, y: 0 }, 50, 50, { x: 0, y: 0 }, 50, 50)
				assert.strictEqual(result, false)
			}
			{ // keine Überlappung links
				const result = physics.checkCollisionRects({ x: 0, y: 0 }, 50, 50, { x: 51, y: 0 }, 50, 50)
				assert.strictEqual(result, false)
			}
			{ // Extra Fallstrick
				const result = physics.checkCollisionRects({ x: 0, y: 0 }, 50, 50, { x: 50, y: 0 }, 50, 50)
				assert.strictEqual(result, true)
			}
			{ // keine Überlappung diagonal rechts-unten
				const result = physics.checkCollisionRects({ x: 0, y: 0 }, 50, 50, { x: 51, y: 51 }, 50, 50)
				assert.strictEqual(result, false)
			}
			{ // keine Überlappung diagonal links-oben
				const result = physics.checkCollisionRects({ x: 0, y: 0 }, 50, 50, { x: -51, y: -51 }, 50, 50)
				assert.strictEqual(result, false)
			}
			{ // Exakte Berührung (Kante an Kante) rechts
				const result = physics.checkCollisionRects({ x: 0, y: 0 }, 50, 50, { x: 50, y: 0 }, 50, 50)
				assert.strictEqual(result, true)
			}
			{ // Exakte Berührung (Kante an Kante) links
				const result = physics.checkCollisionRects({ x: 50, y: 0 }, 50, 50, { x: 0, y: 0 }, 50, 50)
				assert.strictEqual(result, true)
			}
			{ // Exakte Berührung (Kante an Kante) oben
				const result = physics.checkCollisionRects({ x: 0, y: -50 }, 50, 50, { x: 0, y: 0 }, 50, 50)
				assert.strictEqual(result, true)
			}
			{ // Exakte Berührung (Kante an Kante) unten
				const result = physics.checkCollisionRects({ x: 0, y: 0 }, 50, 50, { x: 0, y: 50 }, 50, 50)
				assert.strictEqual(result, true)
			}
		});

		// 	checkCollisionCircleRect(circlePos: Vector2D, r: number, rectPos: Vector2D, w: number, h: number): boolean;
	})
}


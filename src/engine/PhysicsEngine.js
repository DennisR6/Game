// src/engine/PhysicsEngine.js

class PhysicsEngine {
	constructor(arena = null) {
		this.arena = arena;
		this.dt = 1;
	}


	update(entities) {
		for (const fig of entities) {
			if (!fig.isAlive) continue;

			// MovementSystem.integrate(fig, this.dt, this.arena);
			// DriftSystem.apply(fig, this.arena);

			if (this.arena) {
				const insideArena = this.arena.isInsideArena(fig.pos, fig.radius);
				const inDeathZone = this.arena.isInDeathZone(fig.pos, fig.radius);

				if (!insideArena && inDeathZone) {
					fig.isAlive = false;
					EventSystem.emit("figureDeath", fig);
					continue;
				}

				CollisionSystem.resolveFigureArena(fig, this.arena);
			}
		}

		// for (let i = 0; i < this.figures.length; i++) {
		// 	for (let j = i + 1; j < this.figures.length; j++) {
		// 		const a = this.figures[i];
		// 		const b = this.figures[j];
		//
		// 		if (!a.isAlive || !b.isAlive) continue;
		//
		// 		CollisionSystem.resolveFigureFigure(a, b);
		// 	}
		// }
	}
}

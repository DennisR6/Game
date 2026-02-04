const MovementSystem = {
	// Standardwerte – werden später von der Map überschrieben
	defaultFriction: 0.90,
	stopThreshold: 0.05, // Geschwindigkeit unter diesem Wert = Stillstand

	integrate(figure, dt, map = null) {
		if (!figure.isAlive) return;

		// 1. Reibung (map-basiert)
		const friction = map?.getFrictionAt
			? map.getFrictionAt(figure.pos)
			: this.defaultFriction;

		// figure.vel.mult(friction);

		// 2. Positionsintegration
		// figure.pos.add(p5.Vector.mult(figure.vel, dt));

		// 3. Stillstand-Erkennung
		// if (figure.vel.mag() < this.stopThreshold) {
		// 	figure.vel.set(0, 0);
		// }

		// Rotation aktualisieren (falls genutzt)
		// figure.updateRotation(dt);
	}
};

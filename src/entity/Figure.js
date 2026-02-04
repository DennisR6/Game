class Figure {
	x
	y
	id
	playersize
	color
	isAlive

	direction
	force
	impulse
	pos = { x: 0, y: 0 }

	/**
	 * @param {number} x - 
	 * @param {number} y - 
	 * @param {number} playersize - 
	 * @param {number} id - 
	 * @param {string} color - 
	 */
	constructor(x, y, playersize, id, color = "blue") {
		this.x = x
		this.y = y
		this.color = color
		this.playersize = playersize
		this.id = id
		// --- Physikalischer Zustand ---
		this.pos.x = x
		this.pos.y = y
		this.rotation = 0
		// this.pos = createVector(x, y);     // Position
		// this.vel = createVector(0, 0);     // Geschwindigkeit

		// this.rotation = rotation;          // Blickrichtung (radians)
		this.angularVel = 0;               // Drehgeschwindigkeit (optional)

		// --- Physik-Parameter ---
		this.radius = 20;                  // Größe der Figur
		this.mass = 1;                     // Für Impulsübertragung
		this.friction = 0.90;              // Map-basierte Reibung
		this.drift = 0.98;                 // Drift-Faktor

		// --- Gameplay ---
		this.isAlive = true;               // Death-Check
		// this.id = crypto.randomUUID();     // Eindeutige ID für Multiplayer/Replay
	}
	setDrift() { }
	setFriction() { }
	addForce(direction, magnitude) {
		this.force.x += Math.cos(direction) * magnitude;
		this.force.y += Math.sin(direction) * magnitude;
	}
	addImpulse(direction, magnitude) {
		this.impulse.x += Math.cos(direction) * magnitude;
		this.impulse.y += Math.sin(direction) * magnitude;
	}
	// Blickrichtung als Vektor
	getForward() {
		return createVector(
			Math.cos(this.rotation),
			Math.sin(this.rotation)
		);
	}
	draw() {
		noStroke()
		fill(this.color)
		circle(this.x, this.y, this.playersize * 2)
	}
	render(dt) {
		this.rotation += this.angularVel * dt;
	}
	// Rotation aktualisieren
	updateRotation(dt) {
		this.rotation += this.angularVel * dt;
	}

	// Wird von MovementSystem aufgerufen
	integrate(dt) {
		this.pos.add(p5.Vector.mult(this.vel, dt));
		this.updateRotation(dt);
	}
}

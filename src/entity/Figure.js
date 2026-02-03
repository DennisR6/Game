class Figure {
  constructor(x, y, rotation = 0) {
    // --- Physikalischer Zustand ---
    this.pos = createVector(x, y);     // Position
    this.vel = createVector(0, 0);     // Geschwindigkeit

    this.rotation = rotation;          // Blickrichtung (radians)
    this.angularVel = 0;               // Drehgeschwindigkeit (optional)

    // --- Physik-Parameter ---
    this.radius = 20;                  // Größe der Figur
    this.mass = 1;                     // Für Impulsübertragung
    this.friction = 0.90;              // Map-basierte Reibung
    this.drift = 0.98;                 // Drift-Faktor

    // --- Gameplay ---
    this.isAlive = true;               // Death-Check
    this.id = crypto.randomUUID();     // Eindeutige ID für Multiplayer/Replay
  }

  // Blickrichtung als Vektor
  getForward() {
    return createVector(
      Math.cos(this.rotation),
      Math.sin(this.rotation)
    );
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

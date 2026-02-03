const DriftSystem = {
  // Standardwert – wird von der Map überschrieben
  defaultDrift: 0.98, // 0.98 = leichtes Driften, 0.5 = starkes Driften

  apply(figure, map = null) {
    if (!figure.isAlive) return;

    // 1. Drift-Faktor aus Map holen (falls vorhanden)
    const driftFactor = map?.getDriftAt
      ? map.getDriftAt(figure.pos)
      : this.defaultDrift;

    // 2. Forward-Vektor der Figur
    const forward = figure.getForward();

    // 3. Velocity in Forward- und Seitwärts-Komponenten zerlegen
    const vel = figure.vel.copy();
    const forwardComponent = forward.copy().mult(vel.dot(forward));

    // 4. Velocity tendiert zur Forward-Richtung
    //    driftFactor = 1.0  → keine Änderung
    //    driftFactor = 0.0  → komplette Ausrichtung auf Forward
    figure.vel = p5.Vector.lerp(vel, forwardComponent, 1 - driftFactor);
  }
};

const ForceSystem = {
  applyImpulse(figure, force) {
    if (!figure.isAlive) return;

    // Richtung = Rotation
    const forward = figure.getForward();

    // Force → Velocity
    const impulse = forward.copy().mult(force / figure.mass);

    figure.vel.add(impulse);
  }
};

// src/engine/CollisionSystem.js

const CollisionSystem = {
  resolveFigureArena(fig, arena) {
    const r = fig.radius;

    for (const w of arena.wallSegments) {
      const wall = createVector(w.x2 - w.x1, w.y2 - w.y1);
      const wallNormal = createVector(-wall.y, wall.x).normalize();

      const figToWall = createVector(fig.pos.x - w.x1, fig.pos.y - w.y1);
      const dist = figToWall.dot(wallNormal);

      if (Math.abs(dist) < r) {
        const t = figToWall.dot(wall) / wall.magSq();
        if (t >= 0 && t <= 1) {
          fig.pos.sub(wallNormal.copy().mult(dist - r));
          fig.vel.sub(wallNormal.copy().mult(2 * fig.vel.dot(wallNormal)));
        }
      }
    }
  },

  resolveFigureFigure(a, b) {
    const delta = p5.Vector.sub(b.pos, a.pos);
    const dist = delta.mag();
    const minDist = a.radius + b.radius;

    if (dist >= minDist || dist === 0) return;

    const normal = delta.copy().normalize();
    const overlap = minDist - dist;

    a.pos.add(normal.copy().mult(-overlap / 2));
    b.pos.add(normal.copy().mult(overlap / 2));

    const relativeVel = p5.Vector.sub(b.vel, a.vel);
    const velAlongNormal = relativeVel.dot(normal);

    if (velAlongNormal > 0) return;

    const restitution = 1.0;
    const impulseMag =
      -(1 + restitution) * velAlongNormal / (a.mass + b.mass);

    const impulse = normal.copy().mult(impulseMag);

    a.vel.sub(impulse.copy().mult(a.mass));
    b.vel.add(impulse.copy().mult(b.mass));
  }
};

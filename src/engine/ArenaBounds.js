class ArenaBounds {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.deathCircles = [];
    this.wallSegments = [];
  }

  addDeathCircle(cx, cy, r) {
    this.deathCircles.push({ cx, cy, r });
  }

  addWallSegment(x1, y1, x2, y2) {
    this.wallSegments.push({ x1, y1, x2, y2 });
  }

  isInsideArena(pos, radius) {
    return (
      pos.x - radius >= this.x &&
      pos.x + radius <= this.x + this.width &&
      pos.y - radius >= this.y &&
      pos.y + radius <= this.y + this.height
    );
  }

  isInDeathZone(pos, radius) {
    for (const c of this.deathCircles) {
      const dx = pos.x - c.cx;
      const dy = pos.y - c.cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < c.r + radius) return true;
    }
    return false;
  }

  draw() {
    
    noStroke();
    fill(150, 0, 0, 180);
    for (const c of this.deathCircles) {
      circle(c.cx, c.cy, c.r * 2);
    }

    stroke(255);
    strokeWeight(4);
    for (const w of this.wallSegments) {
      line(w.x1, w.y1, w.x2, w.y2);
    }
  }
}

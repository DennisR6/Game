class Player {
  constructor(name, teamColor, figureCount) {
    this.name = name;
    this.teamColor = teamColor;

    // 5 Figuren im 2v2, 10 Figuren im 1v1
    this.figures = [];

    for (let i = 0; i < figureCount; i++) {
      this.figures.push(new Figure(0, 0)); // Position später gesetzt
    }

    this.activeFigureIndex = 0;   // Welche Figur spielt der Spieler im aktuellen Zug
    this.isEliminated = false;    // Hat der Spieler noch Figuren?
  }

  // Gibt die Figur zurück, die der Spieler in diesem Zug bewegt
  getActiveFigure() {
    return this.figures[this.activeFigureIndex];
  }

  // Wird aufgerufen, wenn eine Figur stirbt
  checkElimination() {
    const alive = this.figures.filter(f => f.isAlive).length;
    if (alive === 0) {
      this.isEliminated = true;
    }
  }

  // Rendering der Figuren
  draw() {
    for (const fig of this.figures) {
      if (!fig.isAlive) continue;

      // Körper
      fill(this.teamColor);
      circle(fig.pos.x, fig.pos.y, fig.radius * 2);

      // Blickrichtung
      const f = fig.getForward();
      stroke(255);
      strokeWeight(3);
      line(
        fig.pos.x,
        fig.pos.y,
        fig.pos.x + f.x * fig.radius,
        fig.pos.y + f.y * fig.radius
      );
      noStroke();
    }
  }
}

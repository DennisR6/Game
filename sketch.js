let engine;
let arena;
let fig;
let fig2;

let isAiming = false;
let aimStart;
let aimEnd;

function setup() {
  createCanvas(800, 600);

  const arenaX = 100;
  const arenaY = 100;
  const arenaW = 600;
  const arenaH = 400;

  arena = new ArenaBounds(arenaX, arenaY, arenaW, arenaH);

  const r = 60;

  // 6 Death-Circles – exakt wie deine Skizze
  const holes = [
    // oben
    { x: arenaX + r,             y: arenaY },            // oben links
    { x: arenaX + arenaW / 2,    y: arenaY },            // oben mitte
    { x: arenaX + arenaW - r,    y: arenaY },            // oben rechts

    // unten
    { x: arenaX + r,             y: arenaY + arenaH },   // unten links
    { x: arenaX + arenaW / 2,    y: arenaY + arenaH },   // unten mitte
    { x: arenaX + arenaW - r,    y: arenaY + arenaH }    // unten rechts
  ];

  for (const h of holes) {
    arena.addDeathCircle(h.x, h.y, r);
  }

  createWallSegments(arena, r);

  engine = new PhysicsEngine(arena);

  fig = new Figure(width / 2 - 150, height / 2);
  fig2 = new Figure(width / 2 + 150, height / 2);

  engine.addFigure(fig);
  engine.addFigure(fig2);

  EventSystem.on("figureDeath", (f) => {
    console.log("Figur gestorben:", f);
  });
}

function createWallSegments(arena, r) {
  const topY = arena.y;
  const bottomY = arena.y + arena.height;
  const leftX = arena.x;
  const rightX = arena.x + arena.width;
  const midX = arena.x + arena.width / 2;

  // --- OBERSEITE ---
  arena.addWallSegment(leftX, topY, leftX + r, topY);
  arena.addWallSegment(leftX + 2*r, topY, midX - r, topY);
  arena.addWallSegment(midX + r, topY, rightX - 2*r, topY);
  arena.addWallSegment(rightX - r, topY, rightX, topY);

  // --- UNTERSEITE ---
  arena.addWallSegment(leftX, bottomY, leftX + r, bottomY);
  arena.addWallSegment(leftX + 2*r, bottomY, midX - r, bottomY);
  arena.addWallSegment(midX + r, bottomY, rightX - 2*r, bottomY);
  arena.addWallSegment(rightX - r, bottomY, rightX, bottomY);

  // --- LINKS ---
  arena.addWallSegment(leftX, topY + r, leftX, bottomY - r);

  // --- RECHTS ---
  arena.addWallSegment(rightX, topY + r, rightX, bottomY - r);
}

function draw() {
  background(30);

  arena.draw();
  engine.update();

  drawFigure(fig);
  drawFigure(fig2);

  if (isAiming) drawAimLine();
}

function mousePressed() {
  aimStart = fig.pos.copy();
  aimEnd = null;
  isAiming = true;
}

function mouseDragged() {
  aimEnd = createVector(mouseX, mouseY);
}

function mouseReleased() {
  if (!isAiming || !aimEnd) {
    isAiming = false;
    return;
  }

  const drag = p5.Vector.sub(aimStart, aimEnd);
  if (drag.mag() < 5) {
    isAiming = false;
    return;
  }

  const force = drag.mag() * 0.2;
  fig.rotation = Math.atan2(drag.y, drag.x);
  ForceSystem.applyImpulse(fig, force);

  isAiming = false;
}

function drawFigure(f) {
  if (!f.isAlive) return;

  fill("#00AFFF");
  circle(f.pos.x, f.pos.y, f.radius * 2);

  const fw = f.getForward();
  stroke(255);
  line(f.pos.x, f.pos.y, f.pos.x + fw.x * f.radius, f.pos.y + fw.y * f.radius);
  noStroke();
}

function drawAimLine() {
  if (!aimEnd) return;

  stroke("#FF4444");
  strokeWeight(3);
  line(aimStart.x, aimStart.y, aimEnd.x, aimEnd.y);
}

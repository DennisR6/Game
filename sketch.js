window.mousePressed = () => { }
window.mouseDragged = () => { }
window.mouseReleased = () => { }

// Konstanten
window.Game = undefined

const ArenaX = 100;
const ArenaY = 100;
const ArenaW = 600;
const ArenaH = 400;
const CircleRadius = 60;
// Das wird dann das JSON, welches importiert wird und die Map/Player, Mods darstellt.
const internalGameMod = {
	// size: { x: 0, y: 0, w: 0, h: 0 },
	mapBoundarys: [
		{ type: "circle", x: 100 + CircleRadius, y: 100, r: CircleRadius },
		{ type: "circle", x: ArenaX + ArenaW / 2, y: ArenaY, r: CircleRadius },
		{ type: "circle", x: ArenaX + ArenaW - CircleRadius, y: ArenaY, r: CircleRadius },
		{ type: "circle", x: ArenaX + CircleRadius, y: ArenaY + ArenaH, r: CircleRadius },
		// { type: "line", x: ArenaX + CircleRadius, y: ArenaY + ArenaH, x2: 0, y2: 0, color: CircleRadius },
	],
	players: [
		{ x: 300, y: 300, color: "red", playericon: "*.svg" }
	],
	friction: 0.05,
	effects: [
		{ type: "applyForce", value: 100 }
	],
	items: [],
	background: { type: "picture", url: "" },
}



const defaultScreenResolution = { x: 100, y: 100, w: 600, h: 400 }
function gameInit() {
	const arena = new ArenaBounds(
		defaultScreenResolution.x,
		defaultScreenResolution.y,
		defaultScreenResolution.w,
		defaultScreenResolution.h,
	);
	const topY = arena.y;
	const bottomY = arena.y + arena.height;
	const leftX = arena.x;
	const rightX = arena.x + arena.width;
	const midX = arena.x + arena.width / 2;
	const engine = new PhysicsEngine(arena);
	const ui = new UserInput()
	window.Game = new GameHandler(arena, engine, ui)
	const handler = window.Game

	EventSystem.on("figureDeath", (f) => {
		console.log("Figur gestorben:", f);
	});

	// Structures - Das kommt später in die Map/ damit man es von da laden kann
	// so kannst du map.load(json) aufrufen und die map laden lassen
	// Kreise
	handler.addStructure(new StructureCircle(ArenaX + CircleRadius, ArenaY, CircleRadius))						// oben links
	handler.addStructure(new StructureCircle(ArenaX + ArenaW / 2, ArenaY, CircleRadius))  						// oben mitte
	handler.addStructure(new StructureCircle(ArenaX + ArenaW - CircleRadius, ArenaY, CircleRadius))				// oben rechts
	handler.addStructure(new StructureCircle(ArenaX + CircleRadius, ArenaY + ArenaH, CircleRadius))				// unten links
	handler.addStructure(new StructureCircle(ArenaX + ArenaW / 2, ArenaY + ArenaH, CircleRadius))				// unten mitte
	handler.addStructure(new StructureCircle(ArenaX + ArenaW - CircleRadius, ArenaY + ArenaH, CircleRadius))	// unten rechts

	// Rechtecke
	// --- OBERSEITE ---
	handler.addStructure(new StructureLine(leftX, topY, leftX + CircleRadius, topY));
	handler.addStructure(new StructureLine(leftX + 2 * CircleRadius, topY, midX - CircleRadius, topY));
	handler.addStructure(new StructureLine(midX + CircleRadius, topY, rightX - 2 * CircleRadius, topY));
	handler.addStructure(new StructureLine(rightX - CircleRadius, topY, rightX, topY));
	// --- UNTERSEITE ---
	handler.addStructure(new StructureLine(leftX, bottomY, leftX + CircleRadius, bottomY));
	handler.addStructure(new StructureLine(leftX + 2 * CircleRadius, bottomY, midX - CircleRadius, bottomY));
	handler.addStructure(new StructureLine(midX + CircleRadius, bottomY, rightX - 2 * CircleRadius, bottomY));
	handler.addStructure(new StructureLine(rightX - CircleRadius, bottomY, rightX, bottomY));
	// --- LINKS ---
	handler.addStructure(new StructureLine(leftX, topY + CircleRadius, leftX, bottomY - CircleRadius));
	// --- RECHTS ---
	handler.addStructure(new StructureLine(rightX, topY + CircleRadius, rightX, bottomY - CircleRadius));

	// --- Player ---
	// const entitySize = 30
	// handler.addEntity(new Figure(width / 2 - 150, height / 2, entitySize, 0))
	// handler.addEntity(new Figure(width / 2 + 150, height / 2, entitySize, 1, "red"))


	//das ist ein beispiel wie man die daten dann importieren könnte
	for (const structure of internalGameMod.mapBoundarys) {
		switch (structure.type) {
			case "circle":
				handler.addStructure(new StructureCircle(structure.x, structure.y, structure.r, structure.color))
				break;
			case "line":
				handler.addStructure(new StructureLine(structure.x, structure.y, structure.x2, structure.y2, structure.color))
			default:
				console.log(`${structure.type} is not implemented!`)
		}
	}

	const entitySize = 30
	for (const player of internalGameMod.players) {
		handler.addEntity(new Figure(player.x, player.y, entitySize, 0, player.color))
	}

	window.mousePressed = () => { handler.ui.mousePressed() }
	window.mouseDragged = () => { handler.ui.mouseDragged() }
	window.mouseReleased = () => { handler.ui.mouseReleased() }
}

function setup() {
	createCanvas(800, 600);
	gameInit()
}


function draw() {
	background(30);

	// zuerst rechnen und dann zeichnen
	window.Game.render()
	window.Game.draw()
}


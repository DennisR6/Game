// --- Input Hooks (werden später vom Handler überschrieben) ---
window.mousePressed = () => {};
window.mouseDragged = () => {};
window.mouseReleased = () => {};

// --- Globale Game-Referenz ---
window.Game = undefined;

// --- Arena-Konstanten (werden später durch Map-Daten ersetzt) ---
const defaultScreenResolution = { x: 100, y: 100, w: 600, h: 400 };
const CircleRadius = 60;

// --- Beispielhafte Map-Daten (später JSON-Import) ---
const internalGameMod = {
    mapBoundarys: [
        // Circles
        { type: "circle", x: 40 + CircleRadius, y: 100, r: CircleRadius },                                 				// oben links
        { type: "circle", x: 100 + 600 / 2, y: 100, r: CircleRadius },                                      			// oben mitte
        { type: "circle", x: 160 + 600 - CircleRadius, y: 100, r: CircleRadius },                           			// oben rechts
        { type: "circle", x: 40 + CircleRadius, y: 100 + 400, r: CircleRadius },                           				// unten links
        { type: "circle", x: 100 + 600 / 2, y: 100 + 400, r: CircleRadius },                                			// unten mitte
        { type: "circle", x: 160 + 600 - CircleRadius, y: 600 - 100, r: CircleRadius },                     			// unten rechts

        // Lines
        { type: "line", x: 100 + CircleRadius, y: 100, x2: 100 + 600/2 - CircleRadius, y2: 100 },           			// oben links
        { type: "line", x: 100 + 600/2 + CircleRadius, y: 100, x2: 100 + 600 - CircleRadius, y2: 100 },     			// oben rechts
        { type: "line", x: 100, y: 100 + CircleRadius, x2: 100, y2: 100 + 400 - CircleRadius },             			// links
        { type: "line", x: 100 + 600, y: 100 + CircleRadius, x2: 100 + 600, y2: 100 + 400 - CircleRadius }, 			// rechts
        { type: "line", x: 100 + CircleRadius, y: 100 + 400, x2: 100 + 600/2 - CircleRadius, y2: 100 + 400 }, 			// unten links
        { type: "line", x: 100 + 600/2 + CircleRadius, y: 100 + 400, x2: 100 + 600 - CircleRadius, y2: 100 + 400 } 		// unten rechts
    ],

    players: [
        { x: 300, y: 300, color: "red", playericon: "*.svg" }
    ],

    friction: 0.05,
    effects: [
        { type: "applyForce", value: 100 }
    ],

    items: [],
    background: { type: "picture", url: "" }
};


// --- Game Initialisierung ---
function gameInit() {
    const arena = new ArenaBounds(
        defaultScreenResolution.x,
        defaultScreenResolution.y,
        defaultScreenResolution.w,
        defaultScreenResolution.h
    );

    const engine = new PhysicsEngine(arena);
    const ui = new UserInput();
    window.Game = new GameHandler(arena, engine, ui);
    const handler = window.Game;

    EventSystem.on("figureDeath", (f) => {
        console.log("Figur gestorben:", f);
    });

    // --- Map-Strukturen laden ---
    for (const structure of internalGameMod.mapBoundarys) {
        switch (structure.type) {
            case "circle":
                handler.addStructure(
                    new StructureCircle(structure.x, structure.y, structure.r, structure.color)
                );
                break;

            case "line":
                handler.addStructure(
                    new StructureLine(structure.x, structure.y, structure.x2, structure.y2, structure.color)
                );
                break;

            default:
                console.warn(`${structure.type} is not implemented!`);
        }
    }

    // --- Spieler laden ---
    const entitySize = 30;
    for (const player of internalGameMod.players) {
        handler.addEntity(
            new Figure(player.x, player.y, entitySize, 0, player.color)
        );
    }

    // --- Input an Handler binden ---
    window.mousePressed = () => handler.ui.mousePressed();
    window.mouseDragged = () => handler.ui.mouseDragged();
    window.mouseReleased = () => handler.ui.mouseReleased();
}


// --- p5 Setup ---
function setup() {
    createCanvas(800, 600);
    gameInit();
}


// --- p5 Draw Loop ---
function draw() {
    background(30);

    // zuerst Physik/Logik, dann Rendering
    window.Game.render();
    window.Game.draw();
}

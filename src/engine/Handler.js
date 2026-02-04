/**
 * Verwaltet den Spielzustand, die Entities und die Kommunikation zwischen Arena und Engine.
 */
class GameHandler {
	/** @type {any} Die Spielarena oder das Spielfeld-Objekt */
	arena;

	/** @type {any} Die Physik- oder Logik-Engine */
	engine;

	/** @type {Array<Object>} Liste aller aktiven Spiel-Entities */
	entitys = [];

	/** @type {Object.<string, any>} Map von Komponenten oder Strukturen */
	structures = [];

	/** @type {Array<any>} Hintergrundelemente für das Rendering */
	background = [];

	/** @type {UserInput}*/
	ui
	lastFrameTime = 0;
	gameState = "Pause"
	/**
	 * Erstellt eine neue Instanz des GameHandlers.
	 * @param {any} arena - Die Arena-Instanz.
	 * @param {any} engine - Die Engine-Instanz.
	 */
	constructor(arena, engine, ui) {
		this.arena = arena;
		this.engine = engine;
		this.lastFrameTime = performance.now()
		this.ui = ui
	}

	/**
	 * Zeichnet die Spielwelt und die visuellen Elemente in p5.
	 * Nutzt die aktuelle Zeichenreihenfolge (Arena -> Figuren -> Zielhilfe).
	 */
	draw() {
		for (const structure of this.structures) {
			structure.draw()
			// this.arena.draw();
		}
		for (const entity of this.entitys) {
			entity.draw()
		}
	}

	/**
	 * Aktualisiert die Spiellogik über die Engine.
	 * Übergibt alle aktuellen Entities an den Update-Zyklus.
	 */
	render() {
		for (const entity of this.entitys) {
			entity.render(this.lastFrameTime, this.ui.getPlayerData())
		}
		this.lastFrameTime = performance.now()
	}

	/**
	 * Fügt eine neue Entity zum System hinzu.
	 * @param {Object} entity - Das hinzuzufügende Entity-Objekt.
	 */
	addEntity(entity) {
		this.entitys.push(entity);
	}

	/**
	 * Registriert eine Komponente. Meist sind es Wände oder Barrikaden.
	 * @param {Object} component - Der Name/Key der Komponente.
	 */
	addStructure(structure) {
		this.structures.push(structure)
	}

}

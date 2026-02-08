import type { Background, Settings } from "../settings/setttings";
import { type Structure, StructureCircle, StructureLine, StructureRectangle } from "../structures/structures";
import type { Drawer, Renderer, RenderContext } from "./RenderContext";
import { Player, type IEntity } from "../entity/entity"
import { p5Physics } from "../physics/p5Physics";
import type { IPhysics, PhysicsStrategy } from "../physics/physics";
import { BackgroundColor, type IBackground } from "../background/background";


export class Handler implements Renderer, Drawer {
	entitys: Array<IEntity>;
	structures: Array<Structure>;
	physics: PhysicsStrategy
	//@ts-ignore
	background: IBackground
	constructor(settings?: Settings) {
		this.entitys = [];
		this.structures = [];
		this.physics = new p5Physics()
		if (settings?.background?.type === "color") {
			//@ts-ignore
			this.background = new BackgroundColor(settings.background.color)
		}
		if (settings != undefined) {
			this.importSettings(settings)
		}
	}

	importSettings(settings: Settings) {
		// NOTE: Importiere alle Wände
		settings.mapBoundarys?.forEach(structure => {
			switch (structure.type) {
				case "circle": {
					// NOTE: Das ist typescript Magie, weil der Type Structure kein StructureCircle ist aber andersrum ist ein StructureCircle ein Structure
					const { x, y, r, color } = (structure as unknown as StructureCircle)
					this.structures.push(new StructureCircle(x, y, r, color))
					break
				}
				case "line": {
					const { x, y, x2, y2, color } = (structure as unknown as StructureLine)
					this.structures.push(new StructureLine(x, y, x2, y2, color))
					break
				}
				case "rectangle": {
					const { x, y, w, h, color } = (structure as unknown as StructureRectangle)
					this.structures.push(new StructureRectangle(x, y, w, h, color))
					break
				}
				default:
					//@ts-ignore
					console.log(`${structure.type} is not Implemented yet.`)
					return
			}
			// NOTE: importiere alle Spieler
			settings.players?.forEach((player, id) => {
				const { x, y, team, color, playericon } = player
				this.entitys.push(new Player(x, y, team, color, playericon, id))
			})

			// NOTE: Das kannst du machen, entweder du machst es wie ich oben, oder du fügst

			// TODO: importiere die Global Friction
			// NOTE: die Sachen die aktuell keine direkte Implementation haben, brauchen auch keine Implentation hier,
			// weil es sich das Interface noch ändern kann
			settings.friction
			// TODO: importiere die item-Settings 
			settings.items
			// TODO: importiere die Hintergründe
			// NOTE: dies wäre für dich eine einfache Übung, es komplett zu implementieren
			if (settings.background?.type === "color") {
				this.background = new BackgroundColor(settings.background.color)
			}

			// TODO: importiere die Effekte 
			settings.effects
		}
		)
	}
	addStructure(structure: Structure) {
		this.structures.push(structure)
	}
	addEntity(entity: IEntity) {
		this.entitys.push(entity)
	}
	draw(ctx: RenderContext) {
		ctx.clear("white")
		this.background.draw(ctx)
		for (const structure of this.structures) {
			structure.draw(ctx)
		}
		for (const entity of this.entitys) {
			entity.draw(ctx)
		}
	}
	render(deltatime: number) {
		const queue = [...this.entitys, ...this.structures];
		for (const _entity of queue) {
			// TODO: Hier passiert die Kollisionsprüfung
			// Da es rundenbasiert ist, kann hier auch die Vorhersage-Logik rein
		}
		for (const entity of this.entitys) {
			entity.render(deltatime)
		}
	}

	handleEntityCollision(entityA: IPhysics, entityB: IPhysics) {
		switch (true) {
			case (entityA.shape == "circle" && entityB.shape == "rectangle"): {
				break
			}
			case (entityA.shape == "rectangle" && entityB.shape == "rectangle"): {
				break
			}
			case (entityA.shape == "rectangle" && entityB.shape == "circle"): {
				break
			}
		}
		// const result = this.physics.calculateBounce(entityA, entityB);
		// if (result) {
		//
		// }
	}
}

import type { Settings } from "../settings/setttings";
import { type Structure, StructureCircle, StructureLine, StructureRectangle } from "../structures/structures";
import type { Drawer, Renderer, RenderContext } from "./RenderContext";
import { Player, type IEntity } from "../entity/entity"
import { defaultPhysics, type IPhysics, type PhysicsStrategy } from "../physics/physics";
import { BackgroundColor,BackgroundImage, type IBackground } from "../background/background";


export class Handler implements Renderer, Drawer {
	entitys: Array<IEntity>;
	structures: Array<Structure>;
	physics: PhysicsStrategy
	// TODO: das kommt nach der Background implementierung auch weg
	//@ts-ignore
	background: IBackground
	constructor(settings?: Settings) {
		this.entitys = [];
		this.structures = [];
		this.physics = new defaultPhysics()
		if (settings?.background?.type === "color") {
			//@ts-ignore
			this.background = new BackgroundColor(settings.background.color)
		}
		if (settings != undefined) {
			this.importSettings(settings)
		}
	}

	// TODO:
	importSettings(settings: Settings) {
		// NOTE: Importiere alle Wände
		settings.mapBoundarys?.forEach(structure => {
			switch (structure.type) {
				case "circle": {
					const { x, y, r, color } = structure
					this.structures.push(new StructureCircle(x, y, r, color))
					break
				}
				case "line": {
					const { x, y, x2, y2, color } = structure
					this.structures.push(new StructureLine(x, y, x2, y2, color))
					break
				}
				case "rectangle": {
					const { x, y, w, h, color } = structure
					this.structures.push(new StructureRectangle(x, y, w, h, color))
					break
				}
				default:
					const e: never = structure
					console.log(`${(e as any).type} is not Implemented yet.`)
					return
			}
			// NOTE: importiere alle Spieler
			settings.players?.forEach((player, id) => {
				const { x, y, team, color, playericon } = player
				this.entitys.push(new Player(x, y, team, color, playericon, id))
			})

			// NOTE: Das kannst du machen, entweder du machst es wie ich oben, oder du fügst
			// NOTE: die Sachen die aktuell keine direkte Implementation haben, brauchen auch keine Implentation hier,
			// weil es sich das Interface noch ändern kann
			// TODO: importiere die Global Friction
			settings.friction
			// TODO: importiere die item-Settings 
			settings.items
			// TODO: importiere die Hintergründe
			// NOTE: dies wäre für dich eine einfache Übung, es komplett zu implementieren
			// das ist temporär da, solange die implementierung fehlt, wenn diese da ist muss das "@ts-ignore" weg
			if (settings.background?.type === "color") {
				//@ts-ignore
				this.background = new BackgroundColor(settings.background.color)
			} else if (settings.background?.type === "image") {
				this.background = new BackgroundImage(settings.background.url)
			}

			// TODO: importiere die Effekte
			settings.effects
		}
		)
	}
	// NOTE: stable
	addStructure(structure: Structure) {
		this.structures.push(structure)
	}
	// NOTE: stable
	addEntity(entity: IEntity) {
		this.entitys.push(entity)
	}
	// NOTE: stable
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
	// NOTE: stable
	render(deltatime: number) {
		const queue = [...this.entitys, ...this.structures];
		for (let i = 0; i < queue.length; i++) {
			for (let j = i + 1; j < queue.length; j++) {
				const entity = queue[i];
				const entity2 = queue[j];


				if (this.physics.dist(entity.getPos(), entity2.getPos())) {
					// TODO: Kollision behandeln
				}
			}
		}
		for (const entity of this.entitys) {
			entity.render(deltatime)
		}
	}
	// TODO: 
	handleEntityCollision(entityA: IPhysics, entityB: IPhysics) {
		// this.physics.intersect(entityA, entityB)
	}
}

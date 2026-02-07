import type { Settings } from "../settings/setttings";
import type { Structure } from "../structures/structures";
import type { Drawer, Renderer, RenderContext } from "./RenderContext";


interface Entity extends Drawer, Renderer { }
export class Handler implements Renderer, Drawer {
	entitys: Array<Entity>;
	structures: Array<Structure>;
	constructor(settings?: Settings) {
		this.entitys = [];
		this.structures = [];

		this.importSettings(settings)

	}

	importSettings(settings?: Settings) {
		settings?.mapBoundarys?.forEach(structure => {
			if (structure.type==="")
			this.structures.push()
		}
		)
	}
	addStructure(structure: Structure) {
		this.structures.push(structure)
	}
	addEntity(entity: Entity) {
		this.entitys.push(entity)
	}
	draw(ctx: RenderContext) {
		ctx.drawCircle(100, 100, 60, "red")
	}
	//@ts-ignore
	render(deltatime: number) {
		// const _ = deltatime
	}

}

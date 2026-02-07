import type { Drawer, RenderContext } from "../engine/RenderContext"


export { StructureCircle } from "./structureCircle.ts"
export { StructureRectangle } from "./structureRectangle.ts"
export { StructureLine } from "./structureLine.ts"

export interface Structure extends Drawer {
	draw(ctx: RenderContext): void;
}


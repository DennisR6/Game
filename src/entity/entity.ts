import type { Drawer, RenderContext, Renderer } from "../engine/RenderContext";

export interface IEntity extends Drawer, Renderer {
	x: number;
	y: number;
}

export class Player implements IEntity {
	x: number;
	y: number;
	team: number;
	color: string;
	playericon: string;
	id: number;

	constructor(x: number, y: number, team: number, color: string, playericon: string, id?: number) {
		this.x = x
		this.y = y
		this.team = team
		this.color = color
		this.playericon = playericon
		this.id = id || 0
	}
	draw(ctx: RenderContext): void {
		ctx.setFillColor(this.color)
		ctx.drawCircle(this.x, this.y, 12)
	}
	render(_deltatime: number): void {
		//TODO
	}
}

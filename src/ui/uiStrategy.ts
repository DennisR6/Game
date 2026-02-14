import type { Drawer, RenderContext, Renderer } from "../engine/RenderContext";

export interface UIStrategy extends Drawer, Renderer {

}



export class DefaultUI implements UIStrategy {
	x: number;
	y: number;
	width: number;
	height: number;
	gap: number;
	amnt: number;

	constructor(x: number, y: number, width: number, height: number, gap: number, amnt: number) {
		this.x = x || 10;
		this.y = y || 10;
		this.width = width || 50;
		this.height = height || 50;
		this.gap = gap || 10;
		this.amnt = amnt || 5;
	}
	render(_deltatime: number): void { }
	draw(ctx: RenderContext): void {
		ctx.drawText("Your Turn!", 500, 100, 15)

		for (let i = 0; i < 6; i++) {
			if (i < 5) ctx.setFillColor("green")
			if (i < 4) ctx.setFillColor("yellow")
			if (i < 2) ctx.setFillColor("red")
			ctx.drawRect(150 + (i * 60), 150, 50, 40)
		}
		ctx.setFillColor("green")
		for (let i = 0; i < this.amnt; i++)
			ctx.drawRect(this.x + (this.width + this.gap) * i, this.y, this.width, this.height)
		ctx.setStroke(1)
	}

}




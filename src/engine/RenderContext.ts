export interface RenderContext {
	drawCircle(x: number, y: number, radius: number): void;
	drawRect(x: number, y: number, width: number, height: number): void;
	drawText(text: string, x: number, y: number, fontSize?: number): void;
	setFillColor(color: string): void;
	setStrokeColor(color: string): void;
	clear(color?: string): void;
}

export interface Renderer {
	render(deltatime: number): void;
}
export interface Drawer {
	draw(ctx: RenderContext): void;
}

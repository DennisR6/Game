export interface RenderContext {
	drawCircle(x: number, y: number, radius: number, color: string): void;
	drawRect(x: number, y: number, width: number, height: number, color: string): void;
	drawText(text: string, x: number, y: number, fontSize?: number): void;
	setFillColor(color: string): void;
	setStrokeColor(color: string): void;
	clear(): void;
}

export interface Renderer {
	render(deltatime: number): void;
}
export interface Drawer {
	draw(ctx: RenderContext): void;
}

export interface RenderContext {
	drawCircle(x: number, y: number, radius: number): void;
	drawRect(x: number, y: number, width: number, height: number): void;
	drawText(text: string, x: number, y: number, fontSize?: number): void;
	setFillColor(color: string): void;
	setStrokeColor(color: string): void;
	setStroke(weight: number): void;
	rotate(deg: number): void;
	loadImage(url: string): void;
	drawImage(img: string, dx: number, dy: number, dWidth: number, dHeight: number, sx: number, sy: number, sWidth: number, sHeight: number): void;
	getScreenSize(): { width: number, height: number };
	clear(color?: string): void;
}

export interface Renderer {
	render(deltatime: number): void;
}
export interface Drawer {
	draw(ctx: RenderContext): void;
}

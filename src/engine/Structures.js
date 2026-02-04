class StructureCircle {
	x
	y
	r
	color
	constructor(x, y, r, color) {
		this.x = x
		this.y = y
		this.r = r
		this.color = color || "green"
		//[150, 0, 0, 180]

	}
	draw() {
		noStroke();
		fill(this.color);
		circle(this.x, this.y, this.r * 2)
	}
	render() { }
}
class StructureRectangle {
	x
	y
	w
	h
	color
	/**
	 * @param {number} x - x Dimension of the rectangle
	 * @param {number} y - y Dimension of the rectangle
	 * @param {number} w - Width of the Rectangle
	 * @param {number} h - Height of the Rectangle
	 * @param {string?} color - Color of the Rectangle
	 */
	constructor(x, y, w, h, color) {
		this.x = x
		this.y = y
		this.w = w
		this.h = h
		this.color = color || "green"
		//[150, 0, 0, 180]
	}
	draw() {
		noStroke();
		fill(this.color);
		line(this.x, this.y, this.w, this.h)
	}
	render() { }
}

class StructureLine {
	x
	y
	x2
	y2
	z1
	z2
	color
	/**
	 * @param {number} x - x Dimension of the rectangle
	 * @param {number} y - y Dimension of the rectangle
	 * @param {number} w - Width of the Rectangle
	 * @param {number} h - Height of the Rectangle
	 * @param {string?} color - Color of the Rectangle
	 */
	constructor(x, y, x2, y2, color) {
		this.x = x
		this.x2 = x2
		this.y = y
		this.y2 = y2
		this.color = color || "green"
		// [150, 0, 0, 180]
	}
	draw() {
		stroke(255);
		strokeWeight(4);
		line(this.x, this.y, this.x2, this.y2)
	}
	render() { }
}

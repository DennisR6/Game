/**
 * 
 * @class
 * @classdesc ArenaBounds
 */
class ArenaBounds {
	/**
	 * @param {number} x - 
	 * @param {number} y - 
	 * @param {number} width - 
	 * @param {number} height - 
	 */
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		this.deathCircles = [];
		this.wallSegments = [];
	}

	/**
	 * @param {number} cx - 
	 * @param {number} cy - 
	 * @param {number} r - 
	 */
	addDeathCircle(cx, cy, r) {
		this.deathCircles.push({ cx, cy, r });
	}

	/**
	 * @param {number} x1 - 
	 * @param {number} y1 - 
	 * @param {number} x2 - 
	 * @param {number} y2 - 
	 */
	addWallSegment(x1, y1, x2, y2) {
		this.wallSegments.push({ x1, y1, x2, y2 });
	}

	/**
	 * @param {number} pos - 
	 * @param {number} radius - 
	 * @returns {boolean} - 
	 */
	isInsideArena(pos, radius) {
		return (
			pos.x - radius >= this.x &&
			pos.x + radius <= this.x + this.width &&
			pos.y - radius >= this.y &&
			pos.y + radius <= this.y + this.height
		);
	}

	/**
	 * @param {number} pos - 
	 * @param {number} radius - 
	 * @returns {boolean} - 
	 */
	isInDeathZone(pos, radius) {
		for (const c of this.deathCircles) {
			const dx = pos.x - c.cx;
			const dy = pos.y - c.cy;
			const dist = Math.sqrt(dx * dx + dy * dy);
			if (dist < c.r + radius) return true;
		}
		return false;
	}
}

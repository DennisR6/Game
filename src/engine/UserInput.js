class UserInput {
	/**
	 * @param {boolean} isAiming -
	 * Alle Events kommen von P5.js
	 */
	isAiming
	position
	rotation
	constructor() { }

	render() {
	}
	draw() {
		if (isAiming) drawAimLine();
	}

	mousePressed() {
		aimStart = createVector(mouseX, mouseY);
		aimEnd = null;
		isAiming = true;
	}

	mouseDragged() {
		aimEnd = createVector(mouseX, mouseY);
	}

	mouseReleased() {
		if (!isAiming || !aimEnd) {
			isAiming = false;
			return;
		}

		const drag = p5.Vector.sub(aimStart, aimEnd);
		if (drag.mag() < 5) {
			isAiming = false;
			return;
		}

		const force = drag.mag() * 0.2;
		this.rotation = Math.atan2(drag.y, drag.x);
		this.hasShot = true
		// ForceSystem.applyImpulse(fig, force);

		isAiming = false;
	}
	getPlayerData() {
		return { hasShot: this.hasShot }
	}
}

import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { Container, Graphics } from 'pixi.js';

gsap.registerPlugin(MotionPathPlugin);

class ConfettiPool {
	constructor(size = 200) {
		this.pool = [];
		this.active = new Set();
		this.size = size;
		this.initialize();
	}

	initialize() {
		for (let i = 0; i < this.size; i++) {
			this.pool.push(this.createConfettiPiece());
		}
	}

	createConfettiPiece() {
		const confetti = new Container();
		const graphics = new Graphics();

		// Случайный цвет
		const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff];
		const color = colors[Math.floor(Math.random() * colors.length)];

		graphics.rect(0, 0, 10, 10).fill(color);

		confetti.addChild(graphics);
		return confetti;
	}

	get() {
		if (this.pool.length === 0) {
			return this.createConfettiPiece();
		}
		const confetti = this.pool.pop();
		this.active.add(confetti);
		return confetti;
	}

	release(confetti) {
		if (this.active.has(confetti)) {
			this.active.delete(confetti);
			confetti.alpha = 0;
			confetti.rotation = 0;
			confetti.scale.set(1);
			this.pool.push(confetti);
		}
	}
}

const confettiPool = new ConfettiPool();

export function showVictoryConfetti(app, count = 200) {
	const activeCount = Math.min(count, confettiPool.size);

	for (let i = 0; i < activeCount; i++) {
		const confetti = confettiPool.get();
		confetti.x = app.renderer.width / 2;
		confetti.y = 0;
		confetti.rotation = Math.random() * Math.PI * 2;
		confetti.alpha = 0;

		app.stage.addChild(confetti);

		const startX = confetti.x;
		const startY = confetti.y;
		const endX = startX + (Math.random() - 0.5) * app.renderer.width;
		const endY = startY + Math.random() * app.renderer.height;

		const controlX = startX + (endX - startX) * 0.5;
		const controlY = startY - 100;

		gsap.delayedCall(i * 0.02, () => {
			gsap.to(confetti, {
				alpha: 1,
				duration: 0.2,
				ease: 'power1.out',
			});

			gsap.to(confetti, {
				duration: 2 + Math.random() * 0.8,
				ease: 'power2.out',
				motionPath: {
					path: [
						{ x: startX, y: startY },
						{ x: controlX, y: controlY },
						{ x: endX, y: endY },
					],
					curviness: 2.5,
				},
				rotation: confetti.rotation + Math.random() * 4,
				onComplete: () => {
					gsap.to(confetti, {
						alpha: 0,
						duration: 0.5,
						onComplete: () => {
							app.stage.removeChild(confetti);
							confettiPool.release(confetti);
						},
					});
				},
			});
		});
	}
}

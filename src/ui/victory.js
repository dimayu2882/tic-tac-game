import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { Graphics } from 'pixi.js';

gsap.registerPlugin(MotionPathPlugin);

const COLORS = [0xffd700, 0xff69b4, 0x00bfff, 0x98fb98, 0xffa500];

function createConfettiPiece() {
	const shape = Math.random() > 0.5 ? 'circle' : 'square';
	const graphics = new Graphics();
	const color = COLORS[Math.floor(Math.random() * COLORS.length)];

	if (shape === 'circle') {
		graphics.circle(0, 0, 4).fill(color);
	} else {
		graphics.rect(-4, -4, 8, 8).fill(color);
	}

	return graphics;
}

export function showVictoryConfetti(app, count = 200) {
	for (let i = 0; i < count; i++) {
		const confetti = createConfettiPiece();
		confetti.x = app.renderer.width / 2;
		confetti.y = 0;
		confetti.rotation = Math.random() * Math.PI * 2;
		confetti.alpha = 0;

		app.stage.addChild(confetti);

		const startX = confetti.x;
		const startY = confetti.y;
		const endX = startX + (Math.random() - 0.5) * app.renderer.width;
		const endY = startY + Math.random() * app.renderer.height;

		// Создаем контрольные точки для дуговой траектории
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
					curviness: 2.5, // Увеличиваем кривизну для более выраженной дуги
				},
				rotation: confetti.rotation + Math.random() * 4,
				onComplete: () => {
					gsap.to(confetti, {
						alpha: 0,
						duration: 0.5,
						onComplete: () => confetti.destroy(),
					});
				},
			});
		});
	}
}

import { gsap } from 'gsap';
import { Container, Graphics, Text } from 'pixi.js';

export default async function createBtnStart(app) {
	const button = new Container();
	button.interactive = true;
	button.buttonMode = true;
	button.cursor = 'pointer';
	button.pivot.set(0.5);
	button.label = 'buttonStart';

	const graphics = new Graphics();
	graphics.roundRect(0, 0, 150, 50, 10);
	graphics.fill(0xFCD015);
	button.addChild(graphics);

	const buttonText = new Text( {
		text: 'Start game',
		style: {
			fontFamily: 'Arial',
			fontSize: 24,
			fill: 0x000000,
			align: 'center',
		}
	});
	buttonText.anchor.set(0.5);
	buttonText.x = 150 / 2;
	buttonText.y = 50 / 2;
	button.addChild(buttonText);

	button.x = (app.screen.width - 150) / 2;
	button.y = (app.screen.height - 50) / 2;
	
	gsap.to(button.scale, {
		x: 1.05,
		y: 1.05,
		duration: 0.6,
		yoyo: true,
		repeat: -1,
		ease: 'sine.inOut',
	});
	
	return button;
}

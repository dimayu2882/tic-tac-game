import { Container, Graphics, Text } from 'pixi.js';
import { gsap } from 'gsap';

import { labels } from '../common/enums.js';

export default function createBtnStart(app) {
	const button = new Container();
	button.interactive = true;
	button.buttonMode = true;
	button.cursor = 'pointer';
	button.label = labels.buttonStart;

	const graphics = new Graphics();
	graphics.roundRect(0, 0, 150, 50, 10);
	graphics.fill(0xfcd015);
	button.addChild(graphics);

	const buttonText = new Text({
		text: 'Start game',
		style: {
			fontFamily: 'Arial',
			fontSize: 24,
			fill: 0x000000,
			align: 'center',
		},
	});
	buttonText.anchor.set(0.5);
	buttonText.x = 150 / 2;
	buttonText.y = 50 / 2;
	button.addChild(buttonText);

	button.x = app.screen.width / 2;
	button.y = app.screen.height / 2;
	button.pivot.set(button.width / 2, button.height / 2);

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

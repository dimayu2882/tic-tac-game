import { Container, Graphics, Text } from 'pixi.js';

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

	button.pivot.set(button.width / 2, button.height / 2);
	button.position.set(app.renderer.width / 2, app.renderer.height/ 2);

	const updatePosition = () => {
		button.position.set(app.renderer.width / 2, app.renderer.height/ 2);
	};

	window.addEventListener('resize', updatePosition);
	window.addEventListener('orientationchange', updatePosition);

	return button;
}

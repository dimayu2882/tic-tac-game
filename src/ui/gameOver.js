import { Container, Graphics, Text } from 'pixi.js';
import { gsap } from 'gsap';

import { allTextureKeys } from '../common/assets.js';
import { labels } from '../common/enums.js';
import { createSprite } from '../helpers';

export default function createContainerGameOver(app) {
	const container = new Container();
	container.label = labels.gameOver;

	const trophy = createSprite(allTextureKeys.trophy);
	trophy.label = labels.trophy;

	const draw = createSprite(allTextureKeys.draw);
	draw.label = labels.draw;

	const bg = new Graphics();
	bg.roundRect(0, 0, app.screen.width / 3, app.screen.width / 3, 20);
	bg.fill(0x391898);

	//Player One name
	const playerOneName = new Text({
		text: 'Player One',
		style: {
			fontSize: 48,
			fill: 0xffffff,
			fontFamily: 'Arial',
			align: 'center',
		},
	});
	playerOneName.label = labels.playerOneName;
	playerOneName.anchor.set(0.5, 0.5);
	playerOneName.position.set(bg.height / 2, bg.height / 6);

	//Player two name
	const playerTwoName = new Text({
		text: 'Player Two',
		style: {
			fontSize: 48,
			fill: 0xffffff,
			fontFamily: 'Arial',
			align: 'center',
		},
	});
	playerTwoName.label = labels.playerTwoName;
	playerTwoName.anchor.set(0.5, 0.5);
	playerTwoName.position.set(bg.height / 2, bg.height / 6);

	// Button play again
	const playAgainButton = new Container();
	playAgainButton.interactive = true;
	playAgainButton.buttonMode = true;
	playAgainButton.cursor = 'pointer';
	playAgainButton.label = labels.playAgainButton;

	const graphics = new Graphics();
	graphics.roundRect(0, 0, 150, 50, 10);
	graphics.fill(0xfcd015);
	playAgainButton.addChild(graphics);

	const buttonText = new Text({
		text: 'Play again',
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
	playAgainButton.addChild(buttonText);
	playAgainButton.pivot.set(150 / 2, 50 / 2);
	playAgainButton.position.set(bg.width / 2, bg.height - 50);

	gsap.to(playAgainButton.scale, {
		x: 1.05,
		y: 1.05,
		duration: 0.6,
		yoyo: true,
		repeat: -1,
		ease: 'sine.inOut',
	});

	container.addChild(
		bg,
		trophy,
		draw,
		playerOneName,
		playerTwoName,
		playAgainButton
	);

	container.pivot.set(container.width / 2, container.height / 2);
	container.position.set(app.screen.width / 2, app.screen.height / 2);

	trophy.anchor.set(0.5, 0.5);
	trophy.position.set(bg.width / 2, bg.height / 2);
	// trophy.visible = false;

	draw.anchor.set(0.5, 0.5);
	draw.position.set(bg.width / 2, bg.height / 2);
	draw.visible = false;

	container.scale.set(0);
	container.rotation = 0;

	playerOneName.scale.set(0);
	playerOneName.rotation = 0;

	playerTwoName.scale.set(0);
	playerTwoName.rotation = 0;

	return container;
}

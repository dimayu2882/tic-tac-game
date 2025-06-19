import { gsap } from 'gsap';

import { allTextureKeys } from '../common/assets.js';
import { elementType, labels } from '../common/enums.js';
import { PixiElement } from '../utils/PixiElement.js';

export default function createContainerGameOver(app) {
	const gameOver = new PixiElement({
		type: elementType.CONTAINER,
		label: labels.gameOver,
		position: [app.screen.width / 2, app.screen.height / 2],
		rotation: [0]
	}, onResizeHandler, true);
	const containerGameOver = gameOver.getElement();
	
	// BG
	const bg = new PixiElement({
		type: elementType.GRAPHICS,
		roundRect: [0, 0, 320, 320, 20],
		fill: '0x391898'
	});
	const containerBg = bg.getElement();
	
	// Trophy
	const trophy = new PixiElement({
		type: elementType.SPRITE,
		texture: allTextureKeys.trophy,
		position: [containerBg.width / 2, containerBg.height / 2],
		label: labels.trophy,
		anchor: [0.5, 0.5]
	});
	const containerTrophy = trophy.getElement();
	
	// Draw
	const draw = new PixiElement({
		type: elementType.SPRITE,
		texture: allTextureKeys.draw,
		position: [containerBg.width / 2, containerBg.height / 2],
		anchor: [0.5, 0.5],
		visible: false,
		label: labels.draw
	});
	const containerDraw = draw.getElement();
	
	// Player One name
	const playerOneName = new PixiElement({
		type: elementType.TEXT,
		text: 'Player One',
		style: {
			fontSize: 48,
			fill: 0xffffff,
			fontFamily: 'Arial',
			align: 'center'
		},
		label: labels.playerOneName,
		anchor: [0.5, 0.5],
		position: [containerBg.height / 2, containerBg.height / 6]
	});
	const containerPlayerOne = playerOneName.getElement();
	
	// Player two name
	const playerTwoName = new PixiElement({
		type: elementType.TEXT,
		text: 'Player Two',
		style: {
			fontSize: 48,
			fill: 0xffffff,
			fontFamily: 'Arial',
			align: 'center'
		},
		label: labels.playerTwoName,
		anchor: [0.5, 0.5],
		position: [containerBg.height / 2, containerBg.height / 6]
	});
	const containerPlayerTwo = playerTwoName.getElement();
	
	// Button play again
	const playAgainButton = new PixiElement({
		type: elementType.CONTAINER,
		interactive: true,
		buttonMode: true,
		cursor: 'pointer',
		label: labels.playAgainButton
	});
	const containerPlayAgainButton = playAgainButton.getElement();
	
	const buttonBg = new PixiElement({
		type: elementType.GRAPHICS,
		roundRect: [0, 0, 150, 50, 10],
		fill: '0xfcd015'
	});
	const containerButtonBg = buttonBg.getElement();
	
	const buttonText = new PixiElement({
		type: elementType.TEXT,
		text: 'Play again',
		style: {
			fontFamily: 'Arial',
			fontSize: 24,
			fill: 0x000000,
			align: 'center'
		},
		anchor: [0.5],
		position: [150 / 2, 50 / 2]
	});
	const containerButtonText = buttonText.getElement();
	
	playAgainButton.addChildren([containerButtonBg, containerButtonText]);
	containerPlayAgainButton.pivot.set(150 / 2, 50 / 2);
	containerPlayAgainButton.position.set(containerBg.width / 2, containerBg.height - 50);
	
	gsap.to(containerPlayAgainButton.scale, {
		x: 1.05,
		y: 1.05,
		duration: 0.6,
		yoyo: true,
		repeat: -1,
		ease: 'sine.inOut'
	});
	
	gameOver.addChildren([
		containerBg,
		containerTrophy,
		containerDraw,
		containerPlayerOne,
		containerPlayerTwo,
		containerPlayAgainButton
	]);
	
	containerGameOver.pivot.set(containerGameOver.width / 2, containerGameOver.height / 2);
	containerGameOver.scale.set(0);
	
	function onResizeHandler() {
		containerGameOver.position.set(app.screen.width / 2, app.screen.height / 2);
	}
	
	return containerGameOver;
}

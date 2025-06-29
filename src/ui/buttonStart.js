import { gsap } from 'gsap';

import { elementType, labels } from '../common/enums.js';
import { PixiElement } from '../utils/PixiElement.js';

export default function createBtnStart(app) {
	const button = new PixiElement({
		type: elementType.CONTAINER,
		interactive: true,
		buttonMode: true,
		cursor: 'pointer',
		position: [app.renderer.width / 2, app.renderer.height / 2],
		label: labels.buttonStart,
	}, onResizeHandler, true);
	const buttonElement = button.getElement();
	
	const bgButton = new PixiElement({
		type: elementType.GRAPHICS,
		roundRect: [0, 0, 150, 50, 10],
		fill: '0xfcd015',
	});
	const containerBgButton = bgButton.getElement();
	
	const buttonText = new PixiElement({
		type: elementType.TEXT,
		text: 'Start game',
		anchor: [0.5],
		position: [150 / 2, 50 / 2],
		style: {
			fontFamily: 'Arial',
			fontSize: 24,
			fill: 0x000000,
			align: 'center',
		},
	});
	const containerButtonText = buttonText.getElement();
	
	button.addChildren([containerBgButton, containerButtonText]);
	
	buttonElement.pivot.set(buttonElement.width / 2, buttonElement.height / 2);
	
	gsap.to(buttonElement.scale, {
		x: 1.2,
		y: 1.2,
		duration: 0.6,
		yoyo: true,
		repeat: -1,
		ease: 'sine.inOut',
	});
	
	function onResizeHandler() {
		buttonElement.position.set(app.renderer.width / 2, app.renderer.height / 2);
	}
	
	return buttonElement;
}

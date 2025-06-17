import { Container, Graphics, Text } from 'pixi.js';
import { allTextureKeys } from '../common/assets.js';

import { elementType, labels } from '../common/enums.js';
import { PixiElement } from '../utils/PixiElement.js';
import { subscribeToResize } from '../utils/resizeManager.js';
import { getAppInstance } from '../utils/utils.js';

export default function createBtnStart(app) {
	const button = new PixiElement( {
		type: elementType.CONTAINER,
		interactive: true,
		buttonMode: true,
		cursor: 'pointer',
		
		position: [app.renderer.width / 2, app.renderer.height/ 2],
		label: labels.buttonStart,
	}, onResizeHandler);
	
	// const graphics = new Graphics();
	// graphics.roundRect(0, 0, 150, 50, 10);
	// graphics.fill(0xfcd015);
	// button.addChild(graphics);
	
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
	// buttonText.anchor.set(0.5);
	// buttonText.x = 150 / 2;
	// buttonText.y = 50 / 2;
	button.addChild(buttonText.getElement());
	
	const buttonElement = button.getElement();
	
	buttonElement.pivot.set(buttonElement.width / 2, buttonElement.height / 2);
	
	// button.interactive = true;
	// button.buttonMode = true;
	// button.cursor = 'pointer';
	// button.label = labels.buttonStart;
	// button.pivot.set(button.width / 2, button.height / 2);
	// button.position.set(app.renderer.width / 2, app.renderer.height/ 2);
	
	function onResizeHandler () {
		button.getElement().position.set(app.renderer.width / 2, app.renderer.height/ 2);
	}
	
	return button.getElement();
}

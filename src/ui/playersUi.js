import { PixiElement } from '../utils/PixiElement.js';
import { allTextureKeys } from '../common/assets.js';
import { elementType, labels } from '../common/enums.js';

export default function createPlayers(app) {
	const playersContainer = new PixiElement({
		type: elementType.CONTAINER,
		label: labels.playersContainer,
	}, onResizeHandler, true);
	const playersContainerElement = playersContainer.getElement();
	
	const playerOne = new PixiElement({
		type: elementType.SPRITE,
		texture: allTextureKeys.playerOne,
		label: labels.playerOne,
	});
	const playerOneElement = playerOne.getElement();
	
	const playerTwo = new PixiElement({
		type: elementType.SPRITE,
		texture: allTextureKeys.playerTwo,
		label: labels.playerTwo,
	});
	const playerTwoElement = playerTwo.getElement();
	
	playerOneElement.position.set(playerOneElement.width, 0);
	playerOneElement.pivot.set(playerOneElement.width / 2, playerOneElement.height / 2);
	
	playerTwoElement.position.set(app.screen.width - playerTwoElement.width, 0);
	playerTwoElement.pivot.set(playerTwoElement.width / 2, playerTwoElement.height / 2);
	
	playersContainer.addChildren([playerOneElement, playerTwoElement]);
	playersContainerElement.position.set(0, playersContainerElement.height / 2 + 5);
	
	function onResizeHandler() {
		playerOneElement.position.set(playerOneElement.width, 0);
		playerTwoElement.position.set(app.screen.width - playerTwoElement.width, 0);
	}
	
	return playersContainerElement;
}

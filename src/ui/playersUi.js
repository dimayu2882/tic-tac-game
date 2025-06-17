import { PixiElement } from '../utils/PixiElement.js';
import { allTextureKeys } from '../common/assets.js';
import { elementType, labels } from '../common/enums.js';

export default function createPlayers(app) {
	const playersContainer = new PixiElement({
		type: elementType.CONTAINER,
		label: labels.playersContainer
	}, onResizeHandler, true);
	
	const playerOne = new PixiElement({
		type: elementType.SPRITE,
		texture: allTextureKeys.playerOne,
		label: labels.playerOne,
	});
	
	const playerTwo = new PixiElement({
		type: elementType.SPRITE,
		texture: allTextureKeys.playerTwo,
		label: labels.playerTwo,
	});
	
	playerOne.getElement().position.set(playerOne.getElement().width, 0);
	playerOne.getElement().pivot.set(playerOne.getElement().width / 2, playerOne.getElement().height / 2);
	
	playerTwo.getElement().position.set(app.screen.width - playerTwo.getElement().width, 0);
	playerTwo.getElement().pivot.set(playerTwo.getElement().width / 2, playerTwo.getElement().height / 2);
	
	playersContainer.addChildren([playerOne.getElement(), playerTwo.getElement()]);
	playersContainer.getElement().position.set(0, playersContainer.getElement().height / 2 + 10);
	
	function onResizeHandler() {
		playerOne.getElement().position.set(playerOne.getElement().width, 0);
		playerTwo.getElement().position.set(app.screen.width - playerTwo.getElement().width, 0);
	}
	
	return playersContainer.getElement();
}

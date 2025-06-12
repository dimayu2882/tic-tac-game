import { Container } from 'pixi.js';

import { allTextureKeys } from '../common/assets.js';
import { labels } from '../common/enums.js';
import { createSprite } from '../helpers/index.js';

export default function createPlayers(app) {
	const playersContainer = new Container();
	playersContainer.label = labels.playersContainer;

	const playerOne = createSprite(allTextureKeys.playerOne);
	const playerTwo = createSprite(allTextureKeys.playerTwo);

	playerOne.position.set(playerOne.width, 0);
	playerOne.pivot.set(playerOne.width / 2, playerOne.height / 2);
	playerOne.label = labels.playerOne;

	playerTwo.position.set(app.screen.width - playerTwo.width, 0);
	playerTwo.pivot.set(playerTwo.width / 2, playerTwo.height / 2);
	playerTwo.label = labels.playerTwo;

	playersContainer.addChild(playerOne, playerTwo);
	playersContainer.position.set(0, playersContainer.height / 2 + 10);
	
	const updatePosition = () => {
		playerOne.position.set(playerOne.width, 0);
		playerOne.pivot.set(playerOne.width / 2, playerOne.height / 2);
		
		playerTwo.position.set(app.screen.width - playerTwo.width, 0);
		playerTwo.pivot.set(playerTwo.width / 2, playerTwo.height / 2);
		
		playersContainer.position.set(0, playersContainer.height / 2 + 10);
	};
	
	window.addEventListener('resize', updatePosition);
	window.addEventListener('orientationchange', updatePosition);

	return playersContainer;
}

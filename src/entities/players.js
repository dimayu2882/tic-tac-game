import { Container } from 'pixi.js';

import { allTextureKeys } from '../common/assets.js';
import { labels } from '../common/enums.js';
import { createSprite } from '../helpers/index.js';

export default function createPlayers(app) {
	const gap = app.screen.width / 50;
	const playersContainer = new Container();

	const playerOne = createSprite(allTextureKeys.playerOne);
	const playerTwo = createSprite(allTextureKeys.playerTwo);

	playerOne.position.set(gap, 0);
	playerOne.pivot.set(playerOne.width / 2, playerOne.height / 2);
	playerOne.label = labels.player_one;

	playerTwo.position.set(app.screen.width - gap - playerTwo.width, 0);
	playerTwo.pivot.set(playerTwo.width / 2, playerTwo.height / 2);
	playerTwo.label = labels.player_two;

	playersContainer.addChild(playerOne, playerTwo);

	playersContainer.position.set(0, gap);

	return playersContainer;
}

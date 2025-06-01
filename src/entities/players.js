import { Container } from 'pixi.js';
import { gsap } from 'gsap';

import { allTextureKeys } from '../common/assets.js';
import { createSprite } from '../helpers/index.js';

export default async function createPlayers(app) {
	const gap = app.screen.width / 50;
	const playersContainer = new Container();
	
	const playerOne = await createSprite(allTextureKeys.playerOne);
	const playerTwo = await createSprite(allTextureKeys.playerTwo);
	
	playerOne.position.set(gap, 0);
	playerOne.pivot.set(0.5);
	
	playerTwo.position.set(app.screen.width - gap - playerTwo.width, 0);
	playerTwo.pivot.set(0.5);
	
	playersContainer.addChild(playerOne,  playerTwo);
	
	playersContainer.position.set(0, gap);
	
	return playersContainer;
}

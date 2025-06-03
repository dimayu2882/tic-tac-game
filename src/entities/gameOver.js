import { Container, Graphics } from 'pixi.js';

import { createSprite } from '../helpers';
import { allTextureKeys } from '../common/assets.js';

export default async function createContainerGameOver(app) {
	const container = new Container();
	container.label = 'gameOver';
	
	const trophy = await createSprite(allTextureKeys.trophy);
	trophy.label =  'trophy';
	
	const draw = await createSprite(allTextureKeys.draw);
	draw.label = 'draw';
	
	const bg = new Graphics();
	bg.roundRect(0, 0, app.screen.width / 5, app.screen.width / 5, 20);
	bg.fill(0x391898);
	
	container.addChild(bg,trophy,  draw);
	
	container.pivot.set(container.width / 2, container.height / 2);
	container.position.set(app.screen.width / 2, app.screen.height / 2);
	
	trophy.anchor.set(0.5, 0.5);
	trophy.position.set(bg.height / 2, bg.height / 2);
	trophy.visible = false;
	
	draw.anchor.set(0.5, 0.5);
	draw.position.set(bg.width / 2, bg.height / 2);
	draw.visible = false;
	
	container.scale.set(0);
	container.rotation = 0;
	
	return container;
}

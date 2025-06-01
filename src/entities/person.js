import { Container, Ticker } from 'pixi.js';
import { allTextureKeys } from '../common/assets.js';

import { createSprite } from '../helpers/index.js';

export default async function createPerson() {
	const container = new Container();
	const person = await createSprite(allTextureKeys.woman);
	const personShadow = await createSprite(allTextureKeys.shWoman);
	const personEyelids = await createSprite(allTextureKeys.eyelidsWoman);
	
	personShadow.position.set(-21, 4);
	personEyelids.position.set(32, 42);
	
	let fadingOut = true;
	let alphaSpeed = 0.005;
	const ticker = new Ticker();

	ticker.add(() => {
		if (fadingOut) {
			personEyelids.alpha -= alphaSpeed;
			if (personEyelids.alpha <= 0.1) {
				personEyelids.alpha = 0.1;
				fadingOut = false;
			}
		} else {
			personEyelids.alpha += alphaSpeed;
			if (personEyelids.alpha >= 1) {
				personEyelids.alpha = 1;
				fadingOut = true;
			}
		}
	});
	
	ticker.start();
	
	Object.assign(container, {
		scale: 0.5,
		position: { x: 125, y: 232 }
	})
	
	container.addChild(personShadow, person, personEyelids);
	
	return container;
}

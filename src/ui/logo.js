import { gsap } from 'gsap';

import { allTextureKeys } from '../common/assets.js';
import { labels } from '../common/enums.js';
import { createSprite } from '../helpers/index.js';

export default function createLogo(app) {
	const logo = createSprite(allTextureKeys.logo);

	logo.anchor.set(0.5);
	const scaleX = app.screen.width / logo.texture.width;
	logo.scale.set(scaleX);
	logo.position.set(app.screen.width / 2, app.screen.height / 10);
	logo.label = labels.logo;

	gsap.fromTo(
		logo.scale,
		{ x: 0.2, y: 0.2 }, // начальные значения
		{
			x: 0.5,
			y: 0.5,
			duration: 0.5,
			yoyo: true,
			ease: 'sine.inOut',
		}
	);

	return logo;
}

import { gsap } from 'gsap';

import { allTextureKeys } from '../common/assets.js';
import { elementType, labels } from '../common/enums.js';
import { PixiElement } from '../utils/PixiElement.js';
import { getAppInstance } from '../utils/utils.js';

export default function createLogo() {
	const app = getAppInstance();

	const logo = new PixiElement(
		{
			type: elementType.SPRITE,
			texture: allTextureKeys.logo,
			position: [app.screen.width / 2, 100],
			anchor: [0.5],
			scale: [0.2],
			label: labels.logo,
		},
		onResizeHandler,
		true
	);
	const logoElement = logo.getElement();

	gsap.fromTo(
		logoElement.scale,
		{ x: 0.2, y: 0.2 },
		{ x: 0.5, y: 0.5, duration: 0.5, yoyo: true, ease: 'sine.inOut' }
	);

	function onResizeHandler() {
		logoElement.position.x = app.screen.width / 2;
	}

	return logoElement;
}

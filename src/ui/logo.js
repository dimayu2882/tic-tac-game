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
			position: [app.screen.width / 2, 50],
			anchor: [0.5],
			scale: [0.1],
			label: labels.logo,
		},
		onResizeHandler,
		true
	);
	const logoElement = logo.getElement();

	gsap.fromTo(
		logoElement.scale,
		{ x: 0.1, y: 0.1 },
		{ x: 0.3, y: 0.3, duration: 0.5, yoyo: true, ease: 'sine.inOut' }
	);

	function onResizeHandler() {
		logoElement.position.x = app.screen.width / 2;
	}

	return logoElement;
}

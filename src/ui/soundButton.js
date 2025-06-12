import { Container, Graphics } from 'pixi.js';

import { allTextureKeys } from '../common/assets.js';
import { labels } from '../common/enums.js';
import { createSprite } from '../helpers/index.js';

export default function createSoundButton(app) {
	const container = new Container();
	container.label = labels.sound;
	container.interactive = true;
	container.buttonMode = true;
	container.cursor = 'pointer';
	container.isMuted = false;
	
	const soundButton = createSprite(allTextureKeys.sound);
	soundButton.position.set(10, app.renderer.height - soundButton.height - 10);
	
	// slash
	const slash = new Graphics();
	const r = Math.min(soundButton.width, soundButton.height) / 2;
	const length = r * Math.sqrt(2);
	const half = length / 2;
	slash.setStrokeStyle({ width: 4, color: 0xFBB500, cap: 'round' });
	slash.moveTo(-half, -half);
	slash.lineTo(half, half);
	slash.stroke();
	slash.position.set(soundButton.x + soundButton.width / 2, soundButton.y + soundButton.height / 2);
	slash.alpha = 0;
	slash.label = labels.muteSlash;
	
	container.addChild(soundButton, slash);
	
	const updatePosition = () => {
		soundButton.position.set(10, app.renderer.height - soundButton.height - 10);
	};
	
	window.addEventListener('resize', updatePosition);
	window.addEventListener('orientationchange', updatePosition);
	
	return container;
}

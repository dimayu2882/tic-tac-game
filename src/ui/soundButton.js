import { PixiElement } from '../utils/PixiElement.js';
import { allTextureKeys } from '../common/assets.js';
import { elementType, labels } from '../common/enums.js';

export default function createSoundButton(app) {
	const soundButtonContainer = new PixiElement({
		type: elementType.CONTAINER,
		label: labels.sound,
		interactive: true,
		buttonMode: true,
		cursor: 'pointer',
	}, onResizeHandler, true);
	soundButtonContainer.registerFlag('isMuted', false);
	
	const soundButton = new PixiElement({
		type: elementType.SPRITE,
		texture: allTextureKeys.sound,
	});
	soundButton.getElement().position.set(10, app.renderer.height - soundButton.getElement().height - 10);
	
	// slash
	const r = Math.min(soundButton.getElement().width, soundButton.getElement().height) / 2;
	const length = r * Math.sqrt(2);
	const half = length / 2;
	const slash =  new PixiElement({
		type: elementType.GRAPHICS,
		position: [soundButton.getElement().x + soundButton.getElement().width / 2, soundButton.getElement().y + soundButton.getElement().height / 2],
		half: length / 2,
		setStrokeStyle: { width: 4, color: 0xFBB500, cap: 'round' },
		moveTo: [-half, -half],
		lineTo: [half, half],
		label: labels.muteSlash
	});
	slash.getElement().stroke();
	slash.getElement().visible = false;
	
	soundButtonContainer.addChildren([soundButton.getElement(), slash.getElement()]);
	
	function onResizeHandler () {
		soundButton.getElement().position.set(10, app.renderer.height - soundButton.getElement().height - 10);
	}
	
	return soundButtonContainer.getElement();
}

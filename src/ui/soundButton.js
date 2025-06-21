import { PixiElement } from '../utils/PixiElement.js';
import { allTextureKeys } from '../common/assets.js';
import { elementType, labels } from '../common/enums.js';

export default function createSoundButton(app) {
	const soundButtonContainer = new PixiElement(
		{
			type: elementType.CONTAINER,
			label: labels.sound,
			interactive: true,
			buttonMode: true,
			cursor: 'pointer',
		},
		onResizeHandler,
		true
	);
	soundButtonContainer.registerFlag('isMuted', false);
	const soundButtonContainerElement = soundButtonContainer.getElement();

	const soundButton = new PixiElement({
		type: elementType.SPRITE,
		texture: allTextureKeys.sound,
	});
	const soundButtonElement = soundButton.getElement();
	soundButtonElement.position.set(10, app.renderer.height - soundButtonElement.height - 10);

	// slash
	const r = Math.min(soundButtonElement.width, soundButtonElement.height) / 2;
	const length = r * Math.sqrt(2);
	const half = length / 2;
	const slash = new PixiElement({
		type: elementType.GRAPHICS,
		position: [
			soundButtonElement.x + soundButtonElement.width / 2,
			soundButtonElement.y + soundButtonElement.height / 2,
		],
		half: length / 2,
		setStrokeStyle: { width: 4, color: 0xfbb500, cap: 'round' },
		moveTo: [-half, -half],
		lineTo: [half, half],
		label: labels.muteSlash,
	});
	const slashElement = slash.getElement();
	slashElement.stroke();
	slashElement.visible = false;

	soundButtonContainer.addChildren([soundButtonElement, slashElement]);

	function onResizeHandler() {
		soundButtonElement.position.set(10, app.renderer.height - soundButtonElement.height - 10);
		slashElement.position.set(
			soundButtonElement.x + soundButtonElement.width / 2,
			soundButtonElement.y + soundButtonElement.height / 2
		);
	}

	return soundButtonContainerElement;
}

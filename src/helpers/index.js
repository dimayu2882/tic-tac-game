import { gsap } from 'gsap';
import { Assets, Sprite } from 'pixi.js';

export function createSprite(textureKey) {
	const texture = Assets.cache.get(textureKey);
	return new Sprite(texture);
}

export const findByLabel = (container, label) => {
	if (container.label === label) {
		return container;
	}
	
	for (const child of container.children) {
		const result = findByLabel(child, label);
		if (result) return result;
	}
	
	return null;
};

export const scaleTarget = (target) => {
	gsap.to(target.scale, {
		x: 1.2,
		y: 1.2,
		duration: 0.6,
		yoyo: true,
		repeat: -1,
		ease: 'sine.inOut',
	});
};


import { gsap } from 'gsap';
import { Assets, Sprite } from 'pixi.js';

export function createSprite(textureKey) {
	const texture = Assets.cache.get(textureKey);
	return new Sprite(texture);
}

export const getUIElement = (container, label) => container.getChildByLabel(label);

export function animateContainer(target) {
	gsap.to(target.scale, {
		duration: 1,
		x: 1,
		y: 1,
		ease: 'back.out(1.7)'
	});
	
	gsap.to(target, {
		duration: 1,
		rotation: Math.PI * 2,
		ease: 'back.out(1.7)'
	});
}

export const scaleTarget = target => {
	gsap.killTweensOf(target.scale);

	target.scale.set(1);

	gsap.to(target.scale, {
		x: 1.2,
		y: 1.2,
		duration: 0.6,
		yoyo: true,
		repeat: -1,
		ease: 'sine.inOut',
	});
};

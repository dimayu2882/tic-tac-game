import { gsap } from 'gsap';
import { Assets, Sprite } from 'pixi.js';

export function createSprite(textureKey) {
	const texture = Assets.cache.get(textureKey);
	return new Sprite(texture);
}

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
	// Останавливаем все предыдущие анимации
	gsap.killTweensOf(target.scale);

	// Устанавливаем начальный scale
	target.scale.set(1);

	// Запускаем новую анимацию
	gsap.to(target.scale, {
		x: 1.2,
		y: 1.2,
		duration: 0.6,
		yoyo: true,
		repeat: -1,
		ease: 'sine.inOut',
	});
};

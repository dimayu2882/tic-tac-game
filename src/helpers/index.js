import { Assets, Sprite } from 'pixi.js';

export function createSprite(textureKey) {
	const texture = Assets.cache.get(textureKey);
	if (!texture) {
		throw new Error(`Текстура ${textureKey} не найдена в кэше`);
	}
	return new Sprite(texture);
}


import { gsap } from 'gsap';
import { Assets, Sprite } from 'pixi.js';

export function createSprite(textureKey) {
	const texture = Assets.cache.get(textureKey);
	if (!textureKey) {
		console.error('🛑 textureKey is falsy:', textureKey);
		throw new Error(`❌ textureKey is ${textureKey}`);
	}
	
	if (!texture) {
		console.error('❌ Texture not found in cache:', textureKey);
		console.log('📦 Current cache keys:', [...Assets.cache.keys()]);
		throw new Error(`Текстура ${textureKey} не найдена в кэше`);
	}
	
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

export async function safeUnloadAssets() {
	if (!Assets.cache || typeof Assets.cache.get !== 'function') return;
	
	const keys = Assets.cache?.keys?.();
	if (!keys || typeof keys[Symbol.iterator] !== 'function') return;
	
	for (const key of keys) {
		try {
			const asset = Assets.cache.get(key);
			
			// Если ресурс явно битый — удалим
			if (!asset?.baseTexture?.resource?.src) {
				console.warn('🧹 Удалён битый ресурс:', key);
				Assets.cache.remove(key);
			}
		} catch (e) {
			console.warn('⚠️ Ошибка при удалении ресурса:', key, e);
			Assets.cache.remove(key);
		}
	}
	
	// Затем официально вызываем полное выгружение
	try {
		await Assets.unload();
	} catch (e) {
		console.warn('⚠️ Ошибка при Assets.unload():', e);
	}
}

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


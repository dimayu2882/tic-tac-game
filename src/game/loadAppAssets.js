import { Assets } from 'pixi.js';
import { appTextures } from '../common/assets.js';

export async function loadAppAssets() {
	if (!appTextures || typeof appTextures !== 'object') {
		throw new Error('appTextures не определен или имеет неверный формат');
	}
	
	const loadPromises = Object.entries(appTextures).map(async ([key, url]) => {
		// Удаляем старый ресурс из внутреннего кэша Pixi
		if (Assets.cache.has(url)) {
			Assets.cache.remove(url);
		}
		
		const texture = await Assets.load(url);
		Assets.cache.set(key, texture);
	});
	
	await Promise.all(loadPromises);
}

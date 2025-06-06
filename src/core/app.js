import { Application } from 'pixi.js';
import { initDevtools } from '@pixi/devtools';

export async function createApp() {
	const app = new Application();
	
	await app.init({
		width: window.innerWidth,
		height: window.innerHeight,
		backgroundAlpha: 0,
		antialias: true,
		resizeTo: window,
		autoDensity: true
	});
	
	globalThis.__PIXI_APP__ = app;
	await initDevtools({ app });
	
	return app;
}

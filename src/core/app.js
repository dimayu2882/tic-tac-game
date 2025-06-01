import { Application } from 'pixi.js';
import { initDevtools } from '@pixi/devtools';

export async function createApp() {
	const parent = document.getElementById('pixi-container');
	const app = new Application();
	
	await app.init({
		background: '#cc873a',
		antialias: true,
		resizeTo: parent,
		autoDensity: true,
		resolution: parent.devicePixelRatio || 1,
	});
	
	// Store the application in the global scope for debugging purposes
	globalThis.__PIXI_APP__ = app;
	await initDevtools({ app });
	
	document.getElementById('pixi-container').appendChild(app.canvas);
	return app;
}

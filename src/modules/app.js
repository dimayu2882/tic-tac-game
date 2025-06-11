import { Application } from 'pixi.js';
import { initDevtools } from '@pixi/devtools';

import { CONTAINER_ID } from '../common/constants.js';

export class AppGame {
	async createApp() {
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
		
		const container = document.getElementById(CONTAINER_ID);
		container.appendChild(app.canvas);
		
		return app;
	}
}

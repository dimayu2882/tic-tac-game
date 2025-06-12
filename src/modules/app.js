import { initDevtools } from '@pixi/devtools';
import { Application } from 'pixi.js';

import { CONTAINER_ID } from '../common/constants.js';

export class AppGame {
	async createApp() {
		const container = document.getElementById(CONTAINER_ID);
		const app = new Application();
		
		await app.init({
			width: container.innerWidth,
			height: container.innerHeight,
			backgroundAlpha: 0,
			antialias: true,
			resizeTo: container,
			autoDensity: true,
		});
		globalThis.__PIXI_APP__ = app;

		await initDevtools({ app });
		container.appendChild(app.canvas);
		
		return app;
	}
}

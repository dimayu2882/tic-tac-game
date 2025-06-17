import { initDevtools } from '@pixi/devtools';
import { Application } from 'pixi.js';

import { CONTAINER_ID } from '../common/constants.js';
import { initResizeManager } from '../utils/resizeManager.js';
import { setAppInstance } from '../utils/utils.js';

export class AppGame {
	async createApp() {
		const container = document.getElementById(CONTAINER_ID);
		const app = new Application();
		
		await app.init({
			width: container.clientWidth,
			height: container.clientHeight,
			backgroundAlpha: 0,
			antialias: true,
			resizeTo: container,
			autoDensity: true,
		});
		globalThis.__PIXI_APP__ = app;

		await initDevtools({ app });
		await setAppInstance(app);
		container.appendChild(app.canvas);
		
		initResizeManager();
		
		return app;
	}
}

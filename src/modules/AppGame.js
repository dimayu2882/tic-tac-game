import { Application } from 'pixi.js';

import { CONTAINER_ID } from '../common/constants.js';
import { initResizeManager } from '../utils/resizeManager.js';
import { setAppInstance } from '../utils/utils.js';
import { MainGame } from '../game/MainGame.js';

export class AppGame {
	constructor() {
		this.app = null;
		this.container = document.getElementById(CONTAINER_ID);
		this.game = new MainGame(this.app);
	}

	async initGame() {
		this.app = new Application();
		await this.app.init({
			width: this.container.clientWidth,
			height: this.container.clientHeight,
			backgroundAlpha: 0,
			antialias: true,
			resizeTo: this.container,
			autoDensity: true,
		});

		this.container.appendChild(this.app.canvas);

		this.game = new MainGame(this.app);
		setAppInstance(this.app);

		await this.game.initializeGameElements();
		initResizeManager();
	}
}

import { Assets, Container } from 'pixi.js';

import { appTextures } from '../common/assets.js';
import { PRELOADER_ID } from '../common/constants.js';
import { labels } from '../common/enums.js';
import { GameManager } from './GameManager.js';
import {
	createBoard,
	createBtnStart,
	createContainerGameOver,
	createLogo,
	createPlayers,
	createSoundButton,
} from '../ui/index.js';
import { eventBus } from '../utils/EventBus.js';

export class MainGame {
	constructor(app) {
		this.app = app;
		this.preloader = document.getElementById(PRELOADER_ID);
		this.gameContainer = new Container();
		this.gameContainer.label = labels.game;
	}

	async loadAppAssets() {
		if (!appTextures || typeof appTextures !== 'object') {
			throw new Error('appTextures не определен или имеет неверный формат');
		}

		const assetBundles = Object.entries(appTextures).map(([key, url]) => ({
			alias: key,
			src: url,
		}));

		await Assets.load(assetBundles);
		this.preloader.style.display = 'none';
	}

	initializeGameElements = async () => {
		const { app } = this;
		await this.loadAppAssets();

		this.gameContainer.addChild(
			createLogo(),
			createPlayers(app),
			createBtnStart(app),
			createBoard(app),
			createContainerGameOver(app),
			createSoundButton(app)
		);
		app.stage.addChild(this.gameContainer);

		this.gameManager = new GameManager(app);
		eventBus.emit('startGame');

		return this.gameContainer;
	};
}

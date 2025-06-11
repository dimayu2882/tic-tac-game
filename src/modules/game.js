import { Assets, Container } from 'pixi.js';

import { appTextures } from '../common/assets.js';
import { PRELOADER_ID } from '../common/constants.js';
import { labels } from '../common/enums.js';
import { GameManager } from '../game/logic.js';
import {
	createBoard,
	createBtnStart,
	createContainerGameOver,
	createLogo,
	createPlayers,
} from '../ui/index.js';

export class Game {
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

		const logo = createLogo(app);
		const players = createPlayers(app);
		const btnStart = createBtnStart(app);
		const board = createBoard(app);
		const gameOver = createContainerGameOver(app);

		this.gameContainer.addChild(logo, players, btnStart, board, gameOver);
		app.stage.addChild(this.gameContainer);

		// Даем время на инициализацию всех элементов
		await new Promise(resolve => {
			window.requestAnimationFrame(() => {
				window.requestAnimationFrame(resolve);
			});
		});

		new GameManager(app).startGame();

		return this.gameContainer;
	};
}

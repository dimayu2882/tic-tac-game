import { Assets, Container } from 'pixi.js';

import { appTextures } from '../common/assets.js';
import { PRELOADER_ID } from '../common/constants.js';
import {
	createBoard,
	createBtnStart,
	createContainerGameOver,
	createLogo,
	createPlayers,
} from '../entities/index.js';

export class Game {
	constructor(app) {
		this.app = app;
		this.preloader = document.getElementById(PRELOADER_ID);
		this.gameContainer = new Container();
	}

	async loadAppAssets() {
		if (!appTextures || typeof appTextures !== 'object') {
			throw new Error('appTextures не определен или имеет неверный формат');
		}

		for (const [key, url] of Object.entries(appTextures)) {
			await Assets.load({ alias: key, src: url });
		}

		this.preloader.style.display = 'none';
	}

	initializeGameElements = async () => {
		await this.loadAppAssets();

		const logo = createLogo(this.app);
		const players = createPlayers(this.app);
		const btnStart = createBtnStart(this.app);
		const board = createBoard(this.app);
		const gameOver = createContainerGameOver(this.app);

		this.gameContainer.addChild(logo, players, btnStart, board, gameOver);
		this.app.stage.addChild(this.gameContainer);

		return this.gameContainer;
	};

	restartGame = () => {};
}

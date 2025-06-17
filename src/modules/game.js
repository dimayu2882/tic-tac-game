import { Assets, Container } from 'pixi.js';

import { allTextureKeys, appTextures } from '../common/assets.js';
import { PRELOADER_ID } from '../common/constants.js';
import { elementType, labels } from '../common/enums.js';
import { GameManager } from '../game/logic.js';
import {
	createBoard,
	createBtnStart,
	createContainerGameOver, createLogo,
	createPlayers, createSoundButton
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
		
		const logo = createLogo();
		const players = createPlayers(app);
		const btnStart = createBtnStart(app);
		const board = createBoard(app);
		const gameOver = createContainerGameOver(app);
		const soundButton =  createSoundButton(app);
		
		this.gameContainer.addChild(
			logo,
			players,
			btnStart,
			board,
			gameOver,
			soundButton
		);
		app.stage.addChild(this.gameContainer);

		new GameManager(app).startGame();

		return this.gameContainer;
	};
}

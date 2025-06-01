import { Container, Assets } from 'pixi.js';

import { appTextures } from '../common/assets.js';
import createBoard from '../entities/board.js';
import { createBtnStart, createLogo, createPlayers } from '../entities/index.js'

const createGameContainer = () => {
	const container = new Container();
	container.sortableChildren = true;
	
	return container;
};

const initializeGameElements = async (app) => {
	const gameContainer = createGameContainer();
	const logo = await createLogo(app);
	const btnStart = await createBtnStart(app);
	let board = null;
	const players = await createPlayers(app);
	
	gameContainer.addChild(logo, btnStart, players);
	
	btnStart.on('btn-start-clicked', async () => {
		board = await createBoard(app);
		
		gameContainer.addChild(board);
	});
	
	return gameContainer;
};

const runGame = async (app) => {
	const gameContainer = await initializeGameElements(app);
	app.stage.addChild(gameContainer);
};

export async function setupGame(app) {
	try {
		if (!appTextures || typeof appTextures !== 'object') {
			throw new Error('appTextures не определен или имеет неверный формат');
		}
		
		const loadPromises = Object.entries(appTextures).map(async ([textureId, url]) => {
			const texture = await Assets.load(url);
			Assets.cache.set(textureId, texture);
		});
		
		await Promise.all(loadPromises);
		
		await runGame(app);
		
		document.getElementById('preloader').style.display = 'none';
	} catch (error) {
		console.error('Ошибка при инициализации игры:', error);
		throw error;
	}
}


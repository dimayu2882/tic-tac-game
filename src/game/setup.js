import { Container } from 'pixi.js';
import { createBtnStart, createContainerGameOver, createLogo, createPlayers, createBoard } from '../entities/index.js';
import { logicWrapper } from './logic.js';

const createGameContainer = () => {
	const container = new Container();
	container.sortableChildren = true;
	return container;
};

const initializeGameElements = async (app) => {
	const gameContainer = createGameContainer();
	
	const logo = await createLogo(app);
	const players = await createPlayers(app);
	const btnStart = await createBtnStart(app);
	const board = await createBoard(app);
	const gameOver = await createContainerGameOver(app);
	
	gameContainer.addChild(logo, btnStart, board, players, gameOver);
	
	return gameContainer;
};

const runGame = async (app) => {
	const gameContainer = await initializeGameElements(app);
	app.stage.addChild(gameContainer);
};

export async function setupGame(app) {
	try {
		await runGame(app);
		
		// Скрываем прелоадер
		const preloader = document.getElementById('preloader');
		if (preloader) {
			preloader.style.display = 'none';
		}
		
		await logicWrapper(app);
	} catch (error) {
		console.error('Ошибка при инициализации игры:', error);
		throw error;
	}
}

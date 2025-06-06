import { Container } from 'pixi.js';
import { createBtnStart, createContainerGameOver, createLogo, createPlayers, createBoard } from '../entities/index.js';
import { logicWrapper } from './logic.js';

const createGameContainer = () => {
	const container = new Container();
	container.sortableChildren = true;
	return container;
};

const initializeGameElements = async (app) => {
	console.log('Initializing game elements...');
	
	const gameContainer = createGameContainer();
	
	console.log('Creating logo...');
	const logo = await createLogo(app);
	
	console.log('Creating players...');
	const players = await createPlayers(app);
	
	console.log('Creating start button...');
	const btnStart = await createBtnStart(app);
	
	console.log('Creating board...');
	const board = await createBoard(app);
	
	console.log('Creating game over screen...');
	const gameOver = await createContainerGameOver(app);
	
	gameContainer.addChild(logo, btnStart, board, players, gameOver);
	
	console.log('Game container created with', gameContainer.children.length, 'children');
	return gameContainer;
};

const runGame = async (app) => {
	console.log('Running game...');
	const gameContainer = await initializeGameElements(app);
	app.stage.addChild(gameContainer);
	console.log('Game container added to stage');
};

export async function setupGame(app) {
	try {
		console.log('Setting up game...');
		
		// Убираем повторную загрузку ассетов - они уже загружены в main.js
		// await loadAppAssets();
		
		await runGame(app);
		console.log('Game elements created and added to stage');
		
		// Скрываем прелоадер
		const preloader = document.getElementById('preloader');
		if (preloader) {
			preloader.style.display = 'none';
			console.log('Preloader hidden');
		}
		
		await logicWrapper(app);
		console.log('Game logic initialized');
		
	} catch (error) {
		console.error('Ошибка при инициализации игры:', error);
		throw error;
	}
}

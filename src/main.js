import { createApp } from './core/app.js';
import { loadAppAssets } from './game/loadAppAssets.js';
import { resetPlayAgainButton } from './game/logic.js';
import { setupGame } from './game/setup.js';
import { gameState, stateBoard } from './game/stateGame.js';

let app = null;
let isGameStarting = false;

async function resetGame(app) {
	if (!app || !app.stage) return;
	
	resetPlayAgainButton();
	
	app.stage.children.forEach(child => {
		if (child.destroy) {
			child.destroy({
				children: true,
				texture: false,
				baseTexture: false
			});
		}
	});
	app.stage.removeChildren();
	
	app.stage.interactiveChildren = true;
	
	if (app.renderer.events?.removeAllListeners) {
		try {
			app.renderer.events.removeAllListeners();
		} catch (error) {
			console.warn('Error removing renderer events:', error);
		}
	}
	
	// Сброс состояния игры
	stateBoard.map(state => {
		state.value = '';
		state.isWinning = false;
		state.sprite = null;
	});
	
	gameState.currentPlayer = 'cross';
	gameState.isGameOver = false;
	gameState.winner = null;
}

export async function startGame() {
	if (isGameStarting) return;
	
	isGameStarting = true;
	
	if (app) {
		await resetGame(app);
	} else {
		
		const container = document.getElementById('pixi-container');
		
		container.innerHTML = '';
		app = await createApp();
		
		container.appendChild(app.canvas);
	}
	
	await loadAppAssets();
	await setupGame(app);
}

export async function restartGame() {
	await startGame();
}

// Запуск игры
(async () => {
	await startGame();
})();

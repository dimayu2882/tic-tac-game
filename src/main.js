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
	
	try {
		if (app) {
			console.log('Resetting existing app...');
			await resetGame(app);
		} else {
			console.log('Creating new app...');
			
			const container = document.getElementById('pixi-container');
			console.log('Container found:', !!container);
			
			if (!container) {
				throw new Error('pixi-container element not found');
			}
			
			container.innerHTML = '';
			
			console.log('Creating PIXI app...');
			app = await createApp();
			console.log('PIXI app created successfully');
			
			if (!app.canvas) {
				throw new Error('Canvas not created');
			}
			
			container.appendChild(app.canvas);
		}
		
		await loadAppAssets();
		await setupGame(app);
		
	} catch (error) {
		console.error('Error starting game:', error);
		
		// Показать ошибку пользователю
		const preloader = document.getElementById('preloader');
		if (preloader) {
			preloader.innerHTML = `
        <div style="color: red; padding: 20px; background: white; border: 1px solid red;">
          <h3>Ошибка загрузки игры</h3>
          <p>${error.message}</p>
          <button onclick="location.reload()" style="padding: 10px; margin-top: 10px;">Перезагрузить</button>
        </div>
      `;
		}
		throw error;
	} finally {
		isGameStarting = false;
	}
}

export async function restartGame() {
	await startGame();
}

// Запуск игры
(async () => {
	await startGame();
})();

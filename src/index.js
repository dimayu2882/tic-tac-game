import { AppGame } from './modules/app.js';
import { Game } from './modules/game.js';

(async () => {
	const app = await new AppGame().initAppGame();
	await new Game(app).initializeGameElements();
})();

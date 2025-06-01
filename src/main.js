import { createApp } from './core/app.js';
import { setupGame } from './game/setup.js';

(async () => {
	const app = await createApp();
 
	await setupGame(app);
})();

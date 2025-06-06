import { Application } from 'pixi.js';
import { initDevtools } from '@pixi/devtools';

export async function createApp() {
	
	
	console.log('=== CREATING PIXI APP ===');
	
	try {
		// В новых версиях PIXI нужно использовать init()
		const app = new Application();
		
		await app.init({
			width: window.innerWidth,
			height: window.innerHeight,
			backgroundAlpha: 0,
			antialias: true,
			resizeTo: window,
			autoDensity: true
		});
		
		console.log('PIXI app created:', !!app);
		console.log('Canvas created:', !!app.canvas);
		console.log('Canvas dimensions:', app.canvas.width, 'x', app.canvas.height);
		
		globalThis.__PIXI_APP__ = app;
		await initDevtools({ app });
		
		return app;
	} catch (error) {
		console.error('=== PIXI APP CREATION FAILED ===');
		console.error('Error:', error);
		throw error;
	}
}

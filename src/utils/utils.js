export function debounce(func, delay) {
	let lastCall = 0;
	let lastCallTimer;
	
	return function perform(...args) {
		const now = Date.now();
		if (lastCall && now - lastCall <= delay) {
			clearTimeout(lastCallTimer);
		}
		
		lastCall = now;
		lastCallTimer = setTimeout(() => func(...args), delay);
	};
}

// AppInstance.js
let app = null;

export function setAppInstance(instance) {
	app = instance;
}

export function getAppInstance() {
	if (!app) throw new Error('PIXI app has not been initialized yet');
	return app;
}

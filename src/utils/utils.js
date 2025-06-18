import { Assets, Container, Graphics, Sprite, Text } from 'pixi.js';

import { elementType } from '../common/enums.js';

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

// AppInstance
let app = null;

export function setAppInstance(instance) {
	app = instance;
}

export function getAppInstance() {
	if (!app) throw new Error('PIXI app has not been initialized yet');
	return app;
}

// uiFactory
export class UIFactory {
	static createElement(type, config) {
		const creators = {
			[elementType.SPRITE]: this.createSprite,
			[elementType.TEXT]: this.createText,
			[elementType.GRAPHICS]: this.createGraphics,
			[elementType.CONTAINER]: this.createContainer,
		};

		const creator = creators[type] || creators[elementType.CONTAINER];
		return creator(config);
	}

	static createSprite(config) {
		const texture = Assets.cache.get(config.texture);
		return new Sprite(texture);
	}

	static createText(config) {
		return new Text({
			text: config.text || '',
			style: config.style || {},
		});
	}

	static createGraphics(config) {
		const graphics = new Graphics();
		if (config.roundRect) graphics.roundRect(...config.roundRect);
		if (config.setStrokeStyle) graphics.setStrokeStyle(config.setStrokeStyle);
		if (config.moveTo) graphics.moveTo(...config.moveTo);
		if (config.lineTo) graphics.lineTo(...config.lineTo);
		if (config.fill !== undefined) graphics.fill(config.fill);
		return graphics;
	}

	static createContainer(config) {
		return new Container();
	}
}

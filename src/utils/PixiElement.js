import { Sprite, Container, Text, Graphics, Assets } from 'pixi.js';
import gsap from 'gsap';

import { elementType } from '../common/enums.js';
import { subscribeToResize } from './resizeManager.js';
import { getAppInstance } from './utils.js';

export class PixiElement {
	constructor(config = {}, onResizeHandler, isSubscribeToResize) {
		this.type = config.type || elementType.CONTAINER;
		this.instance = this._create(config);
		this.app =  getAppInstance();
		this.onResizeHandler = onResizeHandler;
		if (isSubscribeToResize) subscribeToResize (this);
	}
	
	_create(config) {
		let el;
		
		const createSprite = (textureKey) => {
			const texture = Assets.cache.get(textureKey);
			return new Sprite(texture);
		}
		
		switch (config.type) {
			case elementType.SPRITE:
				el = createSprite(config.texture);
				break;
			case elementType.TEXT:
				el = new Text({ text: config.text || '', style: config.style || {} });
				break;
			case elementType.GRAPHICS:
				el = new Graphics();
				if (config.roundRect) {
					el.roundRect(...config.roundRect);
				}
				if (config.fill !== undefined) {
					el.fill(config.fill);
				}
				break;
			case elementType.CONTAINER:
			default:
				el = new Container();
				break;
		}
		
		// const directProps = [
		// 	'position',
		// 	'scale',
		// 	'anchor',
		// 	'cursor',
		// 	'interactive',
		// 	'label'
		// ];
		//
		// for (const key of directProps) {
		// 	if (config[key] !== undefined) {
		// 		el[key] = config[key];
		// 	}
		// }
		
		// Общие свойства. Нужно пофиксить ифы, много ифов это плохо!!!
		if (config.position) el.position.set(...config.position);
		if (config.scale) el.scale.set(...config.scale);
		if (config.anchor) el.anchor.set(...config.anchor);
		if (config.alpha !== undefined) el.alpha = config.alpha;
		if (config.name) el.name = config.name;
		if (config.eventMode) el.eventMode = config.eventMode;
		if (config.cursor) el.cursor = config.cursor;
		if (config.interactive !== undefined) el.interactive = config.interactive;
		if (config.label)  el.label = config.label;
		
		// События
		if (config.on) {
			for (const [event, handler] of Object.entries(config.on)) {
				el.on(event, handler);
			}
		}
		
		return el;
	}
	
	// Методы API
	show = () => this.instance.visible = true;
	
	hide = () => this.instance.visible = false;
	
	// Метод fromTo для произвольной анимации
	animateFromTo(targetProperty, fromVars, toVars, options = {}) {
		return gsap.fromTo(this.instance[targetProperty], fromVars, { ...toVars, ...options });
	}
	
	onResize = () => {
		this.onResizeHandler();
	};
	
	destroy = () => this.instance.destroy({ children: true });
	
	addChild = (child) => this.instance.addChild(child);
	
	addToContainer = (container) => container.addChild(this.instance);
	
	getElement = () => this.instance;
}

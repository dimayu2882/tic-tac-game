import { elementType } from '../common/enums.js';
import { subscribeToResize } from './resizeManager.js';
import { getAppInstance, UIFactory } from './utils.js';

export class PixiElement {
	constructor(config = {}, onResizeHandler, isSubscribeToResize) {
		this.type = config.type || elementType.CONTAINER;
		this.instance = this._create(config);
		this.app = getAppInstance();
		this.onResizeHandler = onResizeHandler;
		if (isSubscribeToResize) subscribeToResize(this);
	}

	_create(config) {
		const element = UIFactory.createElement(this.type, config);
		this._applyCommonProperties(element, config);
		return element;
	}

	_applyCommonProperties(element, config) {
		const properties = {
			position: (el, pos) => el.position.set(...pos),
			scale: (el, scale) => el.scale.set(...scale),
			anchor: (el, anchor) => el.anchor.set(...anchor),
			alpha: (el, alpha) => (el.alpha = alpha),
			eventMode: (el, mode) => (el.eventMode = mode),
			cursor: (el, cursor) => (el.cursor = cursor),
			interactive: (el, interactive) => (el.interactive = interactive),
			half: (el, half) => (el.half = half),
			label: (el, label) => (el.label = label),
		};

		Object.entries(properties).forEach(([key, setter]) => {
			if (config[key] !== undefined) {
				setter(element, config[key]);
			}
		});
	}

	// Методы API
	registerFlag = (flagName, value = true) => {
		this.instance.flags = this.instance.flags || {};
		this.instance.flags[flagName] = value;
	};

	show = () => (this.instance.visible = true);

	hide = () => (this.instance.visible = false);

	onResize = () => this.onResizeHandler();

	destroy = () => this.instance.destroy({ children: true });

	addChildren = children => children.forEach(child => this.instance.addChild(child));

	addToContainer = container => container.addChild(this.instance);

	getElement = () => this.instance;
}

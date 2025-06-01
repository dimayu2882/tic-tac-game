import { allTextureKeys } from './assets.js';

const ROWS = 7;
const COLS = 6;
const STARS = [
	{ name: 'yellow', textureKey: allTextureKeys.starYellow },
	{ name: 'blue', textureKey: allTextureKeys.starBlue },
	{ name: 'gray', textureKey: allTextureKeys.starGray },
	{ name: 'green', textureKey: allTextureKeys.starGreen },
	{ name: 'ice', textureKey: allTextureKeys.starIce },
	{ name: 'orange', textureKey: allTextureKeys.starOrange },
	{ name: 'pink', textureKey: allTextureKeys.starPink },
	{ name: 'purple', textureKey: allTextureKeys.starPurple },
	{ name: 'red', textureKey: allTextureKeys.starRed },
	{ name: 'wood', textureKey: allTextureKeys.starWood }
];

export { ROWS, COLS, STARS };

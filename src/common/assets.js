import { Howl } from 'howler';

export const allTextureKeys = {
	cross: 'cross',
	draw: 'draw',
	trophy: 'trophy',
	zero: 'zero',
	bg: 'bg',
	logo: 'logo',
	playerOne: 'playerOne',
	playerTwo: 'playerTwo',
	sound: 'sound',
};

export const appTextures = {
	[allTextureKeys.cross]: 'img/cross.webp',
	[allTextureKeys.draw]: 'img/draw.webp',
	[allTextureKeys.trophy]: 'img/trophy.webp',
	[allTextureKeys.zero]: 'img/zero.webp',
	[allTextureKeys.bg]: 'img/bg.svg',
	[allTextureKeys.logo]: 'img/logo.webp',
	[allTextureKeys.playerOne]: 'img/playerOne.webp',
	[allTextureKeys.playerTwo]: 'img/playerTwo.webp',
	[allTextureKeys.sound]: 'img/sound.webp',
};

export const sounds = {
	click: new Howl({
		src: ['audio/click.mp3'] ,
	}),
	win: new Howl({ src: ['audio/win.mp3'] }),
	bg: new Howl({
		src: ['audio/bg.mp3'],
		loop: true,
		volume: 0.2,
	}),
};

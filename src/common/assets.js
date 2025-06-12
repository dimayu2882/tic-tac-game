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
	[allTextureKeys.cross]: 'img/cross.png',
	[allTextureKeys.draw]: 'img/draw.png',
	[allTextureKeys.trophy]: 'img/trophy.png',
	[allTextureKeys.zero]: 'img/zero.png',
	[allTextureKeys.bg]: 'img/bg.svg',
	[allTextureKeys.logo]: 'img/logo.png',
	[allTextureKeys.playerOne]: 'img/playerOne.png',
	[allTextureKeys.playerTwo]: 'img/playerTwo.png',
	[allTextureKeys.sound]: 'img/sound.png',
};

export const sounds = {
	click: new Howl({
		src: ['audio/click.mp3'] ,
	}),
	win: new Howl({ src: ['audio/win.mp3'] }),
	bg: new Howl({
		src: ['audio/bg.wav'],
		loop: true,
		volume: 0.2,
	}),
};

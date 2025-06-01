import { Container, Graphics } from 'pixi.js';

import { handleCellClick } from '../game/logic.js';
import { stateBoard } from '../game/stateGame.js';

export default async function createBoard(app) {
	const board = new Container();
	
	const cellSize = app.screen.width * 0.15;
	const gap = app.screen.width * 0.005;
	const defaultColor = 0x843CE0;
	const hoverColor = 0xA569BD;
	
	const  boardBg = new Graphics();
	boardBg.roundRect(0, 0, cellSize * 3 + gap * 2, cellSize * 3 + gap * 2, 10);
	boardBg.fill(0x391898);
	boardBg.width = boardBg.width + gap * 4;
	boardBg.height = boardBg.height + gap * 4;
	boardBg.label = 'Board';
	
	board.addChild(boardBg);
	
	for (let i = 0; i < stateBoard.length; i++) {
		const cellContainer = new Container();
		cellContainer.label = i;
		const cell = stateBoard[i];
		const graphics = new Graphics();
		
		graphics.roundRect(0, 0, cellSize, cellSize, 10);
		graphics.fill(0x843CE0);
		
		// позиционируем
		const col = i % 3;
		const row = Math.floor(i / 3);
		cellContainer.position.set(gap * 2 + col * (cellSize + gap), gap * 2 + row * (cellSize + gap));
		
		graphics.x = 0;
		graphics.y = 0;
		
		// сделать кликабельной
		cellContainer.eventMode = 'static';
		cellContainer.cursor = 'pointer';
		
		cellContainer.on('pointerdown', () => {
			handleCellClick(cell, cellContainer, cellSize);
		});
		
		cellContainer.on('pointerover', () => {
			graphics.clear();
			graphics.roundRect(0, 0, cellSize, cellSize, 10);
			graphics.fill(hoverColor);
		});
		
		cellContainer.on('pointerout', () => {
			graphics.clear();
			graphics.roundRect(0, 0, cellSize, cellSize, 10);
			graphics.fill(defaultColor);
		});
		
		// сохранить спрайт
		cell.sprite = graphics;
		
		cellContainer.addChild(graphics);
		
		board.addChild(cellContainer);
	}
	
	board.pivot.set(.5, .5);
	board.position.set(app.screen.width / 2 - board.width / 2, app.screen.height / 2 - board.height / 2);
	
	return board;
}

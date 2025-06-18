import { Container, Graphics } from 'pixi.js';

import { labels } from '../common/enums.js';
import { gameState } from '../game/stateGame.js';
import { eventBus } from '../utils/eventBus.js';

export default function createBoard(app) {
	const board = new Container();

	let cellSize = app.renderer.width * 0.15;
	const gap = app.renderer.width * 0.005;
	const defaultColor = 0x843ce0;
	const hoverColor = 0xa569bd;

	const boardBg = new Graphics();
	boardBg.roundRect(0, 0, cellSize * 3 + gap * 2, cellSize * 3 + gap * 2, 10);
	boardBg.fill(0x391898);
	boardBg.width = boardBg.width + gap * 4;
	boardBg.height = boardBg.height + gap * 4;

	board.addChild(boardBg);
	board.label = labels.board;
	board.visible = false;
	board.width = cellSize * 3 + gap * 2;

	for (let i = 0; i < gameState.board.length; i++) {
		const cellContainer = new Container();
		cellContainer.label = i;
		const cell = gameState.board[i];
		const graphics = new Graphics();
		graphics.label = i;

		graphics.roundRect(0, 0, cellSize, cellSize, 10);
		graphics.fill(0x843ce0);

		// позиционируем
		const col = i % 3;
		const row = Math.floor(i / 3);
		cellContainer.position.set(
			gap * 2 + col * (cellSize + gap),
			gap * 2 + row * (cellSize + gap)
		);

		graphics.x = 0;
		graphics.y = 0;

		// сделать кликабельной
		cellContainer.eventMode = 'static';
		cellContainer.cursor = 'pointer';

		// сохранить спрайт
		cell.sprite = graphics;

		cellContainer.addChild(graphics);

		board.addChild(cellContainer);

		cellContainer.on('pointerdown', () => {
			eventBus.emit('cellClick', { cell, cellContainer, cellSize });
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
	}

	board.pivot.set(board.width / 2, board.height / 2);
	board.position.set(app.renderer.width / 2, app.renderer.height / 2);

	return board;
}

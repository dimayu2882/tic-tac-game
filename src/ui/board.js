import { elementType, labels } from '../common/enums.js';
import { gameState } from '../game/stateGame.js';
import { eventBus } from '../utils/eventBus.js';
import { PixiElement } from '../utils/PixiElement.js';

export default function createBoard(app) {
	const MIN_CELL_SIZE = 100;
	const MAX_CELL_SIZE = 150;
	
	function getAdaptiveCellSize() {
		const base = app.renderer.width * 0.1;
		return Math.max(MIN_CELL_SIZE, Math.min(base, MAX_CELL_SIZE));
	}
	
	let cellSize = getAdaptiveCellSize();
	const gap = app.renderer.width * 0.005;
	const boardPadding = gap * 2;
	
	// Board
	const board = new PixiElement({
		type: elementType.CONTAINER,
		position: [app.renderer.width / 2, app.renderer.height / 2],
		label: labels.board
	}, onBoardResize, true);
	const containerBoard = board.getElement();
	
	// board bg
	const boardBg = new PixiElement({
		type: elementType.GRAPHICS,
		roundRect: [0, 0, cellSize * 3 + boardPadding * 2 + gap * 2, cellSize * 3 + boardPadding * 2 + gap * 2, 10],
		fill: '0x391898'
	}, onBoardBgResize, true);
	const containerBoardBg = boardBg.getElement();
	
	board.addChildren([containerBoardBg]);
	
	const cellContainers = [];
	const graphicsElements = [];
	
	for (let i = 0; i < gameState.board.length; i++) {
		const col = i % 3;
		const row = Math.floor(i / 3);
		
		const cellContainer = new PixiElement({
			type: elementType.CONTAINER,
			label: i,
			position: [boardPadding + col * (cellSize + gap), boardPadding + row * (cellSize + gap)],
			eventMode: 'static',
			cursor: 'pointer'
		}, () => onCellContainerResize(cellContainer, i), true);
		const containerCellContainer = cellContainer.getElement();
		
		const cell = gameState.board[i];
		
		const graphics = new PixiElement({
			type: elementType.GRAPHICS,
			label: i,
			position: [0, 0],
			roundRect: [0, 0, cellSize, cellSize, 10],
			fill: '0x843ce0'
		}, () => onCellGraphicsResize(graphics, i), true);
		const elementGraphics = graphics.getElement();
		
		// сохранить спрайт
		cell.sprite = elementGraphics;
		
		cellContainer.addChildren([elementGraphics]);
		
		board.addChildren([containerCellContainer]);
		
		containerCellContainer.on('pointerdown', () => {
			eventBus.emit('cellClick', { cell, cellContainer: containerCellContainer, cellSize });
		});
		
		cellContainers.push(cellContainer);
		graphicsElements.push(graphics);
	}
	
	containerBoard.pivot.set(containerBoard.width / 2, containerBoard.height / 2);
	board.hide();
	
	// Resize handlers
	function onBoardResize() {
		cellSize = getAdaptiveCellSize();
		onBoardBgResize();
		cellContainers.forEach((cellContainer, i) => onCellContainerResize(cellContainer, i));
		graphicsElements.forEach((graphics, i) => onCellGraphicsResize(graphics, i));
		containerBoard.pivot.set(containerBoard.width / 2, containerBoard.height / 2);
		containerBoard.position.set(app.renderer.width / 2, app.renderer.height / 2);
	}
	
	function onBoardBgResize() {
		const gap = app.renderer.width * 0.005;
		const boardPadding = gap * 2;
		cellSize = getAdaptiveCellSize();
		containerBoardBg.clear();
		containerBoardBg.roundRect(0, 0, cellSize * 3 + boardPadding * 2 + gap * 2, cellSize * 3 + boardPadding * 2 + gap * 2, 10);
		containerBoardBg.fill(0x391898);
	}
	
	function onCellContainerResize(cellContainer, i) {
		const gap = app.renderer.width * 0.005;
		const boardPadding = gap * 2;
		cellSize = getAdaptiveCellSize();
		const col = i % 3;
		const row = Math.floor(i / 3);
		cellContainer.getElement().position.set(boardPadding + col * (cellSize + gap), boardPadding + row * (cellSize + gap));
	}
	
	function onCellGraphicsResize(graphics) {
		cellSize = getAdaptiveCellSize();
		graphics.getElement().clear();
		graphics.getElement().roundRect(0, 0, cellSize, cellSize, 10);
		graphics.getElement().fill(0x843ce0);
	}
	
	return containerBoard;
}

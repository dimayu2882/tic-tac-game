import { gsap } from 'gsap';

import { createSprite, findByLabel, scaleTarget } from '../helpers/index.js';
import { allTextureKeys } from '../common/assets.js';
import { gameState, stateBoard } from './stateGame.js';

export const logicWrapper = async (app) => {
	const board = findByLabel(app.stage, 'board');
	const button = findByLabel(app.stage, 'buttonStart');
	const playerOne = findByLabel(app.stage, 'playerOne');
	
	button.on('pointerdown', () => {
		scaleTarget(playerOne);
		board.visible = true;
	});
};

export const handleCellClick = async (cell, cellContainer, cellSize, app) => {
	if (gameState.isGameOver || cell.value !== '') return;
	
	const gameOver = findByLabel(app.stage, 'gameOver');
	const draw = findByLabel(app.stage, 'draw');
	const trophy = findByLabel(app.stage, 'trophy');
	
	const playerOne = findByLabel(app.stage, 'playerOne');
	const playerTwo = findByLabel(app.stage, 'playerTwo');
	
	function animateContainer(target) {
		gsap.to(target.scale, {
			duration: 1,
			x: 1,
			y: 1,
			ease: 'back.out(1.7)',
		});
		
		gsap.to(target, {
			duration: 1,
			rotation: Math.PI * 2,
			ease: 'back.out(1.7)',
		});
	}
	
	cell.value = gameState.currentPlayer;
	
	let cellValue = null;
	if (gameState.currentPlayer === 'cross') {
		cellValue = createSprite(allTextureKeys.cross);
		scaleTarget(playerTwo);
		gsap.killTweensOf(playerOne.scale);
		
	} else {
		cellValue = createSprite(allTextureKeys.zero);
		scaleTarget(playerOne);
		gsap.killTweensOf(playerTwo.scale);
	}
	
	if (cellValue) {
		cellValue.label = cell.value;
		cellValue.anchor.set(0.5, 0.5);
		cellValue.width = cellContainer.width / 1.5;
		cellValue.height = cellContainer.width / 1.5;
		cellValue.position.set(cellSize / 2, cellSize / 2);
		
		gsap.fromTo(cellValue.scale, {
			y: 0,
			x: 0,
		}, { y: 1, x: 1 });
		cellContainer.addChild(cellValue);
	}
	
	const result = checkWinner(stateBoard);
	
	if (result) {
		gameState.isGameOver = true;
		
		if (result === 'draw') {
			gameState.winner = null;
			draw.visible = true;
			animateContainer(gameOver);
			
		} else {
			gameState.winner = result.winner;
			highlightWinningCells(result.line);
			trophy.visible = true;
			animateContainer(gameOver);
		}
		return;
	}
	
	gameState.currentPlayer = gameState.currentPlayer === 'cross' ? 'zero' : 'cross';
};

export const checkWinner = (board) => {
	const winLines = [
		[0, 1, 2], [3, 4, 5], [6, 7, 8], // строки
		[0, 3, 6], [1, 4, 7], [2, 5, 8], // столбцы
		[0, 4, 8], [2, 4, 6]             // диагонали
	];
	
	for (const [a, b, c] of winLines) {
		const val = board[a].value;
		if (val && val === board[b].value && val === board[c].value) {
			return { winner: val, line: [a, b, c] };
		}
	}
	
	const isDraw = board.every(cell => cell.value !== '');
	return isDraw ? 'draw' : null;
};

function highlightWinningCells(line) {
	line.forEach(index => {
		const cell = stateBoard[index];
		cell.sprite.tint = 0x23C834;
		cell.isWinning = true;
	});
	console.log(gameState);
}

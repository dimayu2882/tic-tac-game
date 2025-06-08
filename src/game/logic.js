import { gsap } from 'gsap';
import { BlurFilter } from 'pixi.js';
import { allTextureKeys } from '../common/assets.js';
import { gameValues, labels } from '../common/enums.js';
import { createSprite, findByLabel, scaleTarget } from '../helpers/index.js';
import { gameState, stateBoard } from './stateGame.js';

let isPlayAgainButtonSetup = false; // Флаг для отслеживания

export const logicWrapper = async app => {
	const board = findByLabel(app.stage, labels.board);
	const button = findByLabel(app.stage, labels.button_start);
	const playerOne = findByLabel(app.stage, labels.player_one);

	button.on('pointerdown', () => {
		scaleTarget(playerOne);
		board.visible = true;
	});
};

export const handleCellClick = async (cell, cellContainer, cellSize, app) => {
	if (gameState.isGameOver || cell.value !== '') return;

	const board = findByLabel(app.stage, labels.board);
	const gameOver = findByLabel(app.stage, labels.game_over);
	const draw = findByLabel(app.stage, labels.draw);
	const trophy = findByLabel(app.stage, labels.trophy);
	const playerOneName = findByLabel(app.stage, labels.player_one_name);
	const playerTwoName = findByLabel(app.stage, labels.player_two_name);
	const playAgainButton = findByLabel(app.stage, labels.play_again_button);

	const playerOne = findByLabel(app.stage, labels.player_one);
	const playerTwo = findByLabel(app.stage, labels.player_two);

	// Устанавливаем обработчик только один раз
	if (!isPlayAgainButtonSetup) {
		playAgainButton.on('pointerdown', () => {
			restartGame();
		});
		isPlayAgainButtonSetup = true;
	}

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
	if (gameState.currentPlayer === gameValues.cross) {
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

		gsap.fromTo(
			cellValue.scale,
			{
				y: 0,
				x: 0,
			},
			{ y: 1, x: 1 }
		);
		cellContainer.addChild(cellValue);
	}

	const result = checkWinner(stateBoard);

	if (result) {
		gameState.isGameOver = true;

		board.filters = [new BlurFilter({ strength: 4 })];

		if (result === gameValues.draw) {
			gameState.winner = null;
			draw.visible = true;
			animateContainer(gameOver);
		} else {
			gameState.winner = result.winner;
			highlightWinningCells(result.line, playerOneName, playerTwoName);
			trophy.visible = true;
			animateContainer(gameOver);

			gameState.winner === gameValues.cross
				? animateContainer(playerOneName)
				: animateContainer(playerTwoName);
		}
		return;
	}

	gameState.currentPlayer =
		gameState.currentPlayer === gameValues.cross
			? gameValues.zero
			: gameValues.cross;
};

// Функция для сброса флага при рестарте
export const resetPlayAgainButton = () => {
	isPlayAgainButtonSetup = false;
};

// Функция проверки выигрыша
export const checkWinner = board => {
	const winLines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8], // строки
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8], // столбцы
		[0, 4, 8],
		[2, 4, 6], // диагонали
	];

	for (const [a, b, c] of winLines) {
		const val = board[a].value;
		if (val && val === board[b].value && val === board[c].value) {
			return { winner: val, line: [a, b, c] };
		}
	}

	const isDraw = board.every(cell => cell.value !== '');
	return isDraw ? { winner: null, line: [] } : null;
};

function highlightWinningCells(line, playerOneName, playerTwoName) {
	line.forEach(index => {
		const cell = stateBoard[index];
		cell.sprite.tint = 0x23c834;
		cell.isWinning = true;
	});
}

function restartGame(app) {
	gameState.isGameOver = false;
	gameState.currentPlayer = gameValues.cross;
	gameState.winner = null;

	// Reset board state
	stateBoard.forEach(cell => {
		cell.value = '';
		if (cell.container) {
			cell.container.removeChildren();
		}
	});

	// Reset UI elements
	const board = findByLabel(app.stage, labels.board);
	const gameOver = findByLabel(app.stage, labels.game_over);
	const draw = findByLabel(app.stage, labels.draw);
	const trophy = findByLabel(app.stage, labels.trophy);

	board.filters = [];
	gameOver.visible = false;
	draw.visible = false;
	trophy.visible = false;
}

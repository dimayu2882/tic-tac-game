import { gsap } from 'gsap';
import { BlurFilter, Container } from 'pixi.js';

import { allTextureKeys } from '../common/assets.js';
import { gameValues, labels } from '../common/enums.js';
import {
	animateContainer,
	createSprite,
	scaleTarget
} from '../helpers/index.js';
import { showVictoryConfetti } from '../ui/victory.js';
import { gameState, stateBoard } from './stateGame.js';

export class GameManager {
	constructor(app) {
		this.app = app;
		
		//UI elements
		this.gameContainer = this.app.stage.getChildByLabel(labels.game);
		this.btnStart = this.gameContainer.getChildByLabel(labels.buttonStart);
		this.board = this.gameContainer.getChildByLabel(labels.board);
		this.players = this.gameContainer.getChildByLabel(labels.playersContainer);
		this.playerOne = this.players.getChildByLabel(labels.playerOne);
		this.playerTwo = this.players.getChildByLabel(labels.playerTwo);
		this.gameOver = this.gameContainer.getChildByLabel(labels.gameOver);
		this.draw = this.gameOver.getChildByLabel(labels.draw);
		this.trophy = this.gameOver.getChildByLabel(labels.trophy);
		this.playerOneName = this.gameOver.getChildByLabel(labels.playerOneName);
		this.playerTwoName = this.gameOver.getChildByLabel(labels.playerTwoName);
		this.playAgainButton = this.gameOver.getChildByLabel(labels.playAgainButton);
		
		// Добавляем обработчик для кнопки Play Again
		this.playAgainButton.on('pointerdown', () => this.restartGame(this.board));
	}
	
	checkWinner(board) {
		const winLines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8], // строки
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8], // столбцы
			[0, 4, 8],
			[2, 4, 6] // диагонали
		];
		
		for (const [a, b, c] of winLines) {
			const val = board[a].value;
			if (val && val === board[b].value && val === board[c].value) {
				return { winner: val, line: [a, b, c] };
			}
		}
		
		const isDraw = board.every(cell => cell.value !== '');
		return isDraw ? { winner: null, line: [] } : null;
	}
	
	handleCellClick = (cell, cellContainer, cellSize) => {
		if (gameState.isGameOver || cell.value !== '') return;
		
		cell.value = gameState.currentPlayer;
		
		let cellValue = null;
		if (gameState.currentPlayer === gameValues.cross) {
			cellValue = createSprite(allTextureKeys.cross);
			scaleTarget(this.playerTwo);
			gsap.killTweensOf(this.playerOne.scale);
		} else {
			cellValue = createSprite(allTextureKeys.zero);
			scaleTarget(this.playerOne);
			gsap.killTweensOf(this.playerTwo.scale);
		}
		
		if (cellValue) {
			cellValue.anchor.set(0.5, 0.5);
			cellValue.position.set(cellSize / 2, cellSize / 2);
			
			gsap.fromTo(
				cellValue.scale,
				{
					y: 0,
					x: 0
				},
				{ y: .3, x: .3 }
			);
			cellContainer.addChild(cellValue);
		}
		
		const result = this.checkWinner(stateBoard);
		
		if (result) {
			gameState.isGameOver = true;
			
			this.board.filters = [new BlurFilter({ strength: 4 })];
			
			// Останавливаем анимацию для обоих игроков
			gsap.killTweensOf(this.playerOne.scale);
			gsap.killTweensOf(this.playerTwo.scale);
			
			if (result.winner === null) {
				gameState.winner = null;
				this.draw.visible = true;
				this.gameOver.visible = true;
				animateContainer(this.gameOver);
			} else {
				gameState.winner = result.winner;
				this.trophy.visible = true;
				this.gameOver.visible = true;
				animateContainer(this.gameOver);
				
				gameState.winner === gameValues.cross
					? animateContainer(this.playerOneName)
					: animateContainer(this.playerTwoName);
			}
			
			showVictoryConfetti(this.app);
			return;
		}
		
		gameState.currentPlayer =
			gameState.currentPlayer === gameValues.cross
				? gameValues.zero
				: gameValues.cross;
	};
	
	startGame = () => this.btnStart.on('pointerdown', () => {
		this.board.visible = true;
		scaleTarget(this.playerOne);
	});
	
	restartGame(board) {
		// Сбрасываем состояние игры
		gameState.isGameOver = false;
		gameState.currentPlayer = gameValues.cross;
		gameState.winner = null;
		
		// Очищаем стейт
		stateBoard.forEach(stateCell => {
			stateCell.value = '';
			stateCell.sprite = null;
		});
		
		// Очищаем доску
		board.children
			.filter(cell => cell instanceof Container && cell.children[1])
			.forEach(cell => cell.children[1].destroy());
		
		// Сбрасываем UI элементы
		this.board.filters = null;
		this.gameOver.visible = false;
		this.draw.visible = false;
		this.trophy.visible = false;
		this.playerOneName.scale.set(0);
		this.playerTwoName.scale.set(0);
		
		// Сбрасываем анимации игроков
		gsap.killTweensOf(this.playerOne.scale);
		gsap.killTweensOf(this.playerTwo.scale);
		
		// Запускаем анимацию первого игрока
		scaleTarget(this.playerOne);
	}
}

import { gsap } from 'gsap';
import { BlurFilter, Container } from 'pixi.js';

import { allTextureKeys } from '../common/assets.js';
import { gameValues, labels } from '../common/enums.js';
import { animateContainer, createSprite, scaleTarget, getUIElement } from '../helpers/index.js';
import { showVictoryConfetti } from '../ui/victory.js';
import { eventBus } from '../utils/EventBus.js';
import { soundManager } from '../utils/SoundManager.js';
import { gameState } from './GameState.js';

export class GameManager {
	constructor(app) {
		this.app = app;

		const gameContainer = getUIElement(this.app.stage, labels.game);
		const players = getUIElement(gameContainer, labels.playersContainer);
		const gameOver = getUIElement(gameContainer, labels.gameOver);
		const soundButton = getUIElement(gameContainer, labels.sound);

		this.btnStart = getUIElement(gameContainer, labels.buttonStart);
		this.board = getUIElement(gameContainer, labels.board);
		this.playerOne = getUIElement(players, labels.playerOne);
		this.playerTwo = getUIElement(players, labels.playerTwo);
		this.gameOver = gameOver;
		this.draw = getUIElement(gameOver, labels.draw);
		this.trophy = getUIElement(gameOver, labels.trophy);
		this.playerOneName = getUIElement(gameOver, labels.playerOneName);
		this.playerTwoName = getUIElement(gameOver, labels.playerTwoName);
		this.playAgainButton = getUIElement(gameOver, labels.playAgainButton);
		this.soundButton = soundButton;
		this.slash = getUIElement(soundButton, labels.muteSlash);

		// Подписываемся на события
		eventBus.on('cellClick', this.handleCellClick);
		eventBus.on('startGame', this.startGame);
		eventBus.on('restartGame', this.restartGame);
		eventBus.on('toggleSound', this.toggleSound);

		// Добавляем обработчики
		this.soundButton.on('pointerdown', () => eventBus.emit('toggleSound'));
		this.playAgainButton.on('pointerdown', () => eventBus.emit('restartGame', this.board));
	}

	checkWinner() {
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
			const val = gameState.getCellValue(a);
			if (
				val &&
				val === gameState.getCellValue(b) &&
				val === gameState.getCellValue(c)
			) return { winner: val, line: [a, b, c] };
		}

		const isDraw = gameState.board.every(cell => cell.value !== '');
		return isDraw ? { winner: null, line: [] } : null;
	}

	handleCellClick = ({ cell, cellContainer, cellSize }) => {
		if (gameState.isGameOver || cell.value !== '') return;

		soundManager.play('click');

		gameState.setCellValue(cellContainer.label, gameState.currentPlayer);

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
				{y: 0, x: 0},
				{y: 0.2, x: 0.2}
			);
			cellContainer.addChild(cellValue);
		}

		const result = this.checkWinner();

		if (result) {
			gameState.setGameOver(result.winner);

			this.board.filters = [new BlurFilter({ strength: 4 })];

			// Останавливаем анимацию для обоих игроков
			gsap.killTweensOf(this.playerOne.scale);
			gsap.killTweensOf(this.playerTwo.scale);

			if (result.winner === null) {
				this.draw.visible = true;
				this.gameOver.visible = true;
				animateContainer(this.gameOver);
			} else {
				this.trophy.visible = true;
				this.gameOver.visible = true;
				animateContainer(this.gameOver);

				gameState.winner === gameValues.cross
					? animateContainer(this.playerOneName)
					: animateContainer(this.playerTwoName);
			}

			showVictoryConfetti(this.app);
			soundManager.play('win');
			return;
		}

		gameState.switchPlayer();
	};

	startGame = () => {
		this.btnStart.on('pointerdown', () => {
			this.board.visible = true;
			scaleTarget(this.playerOne);
			soundManager.play('bg');
		});
	};

	restartGame = board => {
		gameState.reset();

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
	};

	toggleSound = () => {
		const isMuted = soundManager.toggleMute();

		gsap.to(this.slash, {
			visible: isMuted,
			duration: 0.25,
			ease: 'power2.out',
		});
	};
}

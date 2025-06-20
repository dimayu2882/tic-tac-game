import { gameValues } from '../common/enums.js';

class GameState {
	constructor() {
		this.board = Array(9)
			.fill(null)
			.map((_, index) => ({
				row: Math.floor(index / 3),
				col: index % 3,
				value: '',
				sprite: null,
			}));

		this.currentPlayer = gameValues.cross;
		this.isGameOver = false;
		this.winner = null;
		this.isMuted = false;
	}

	reset() {
		this.board.forEach(cell => {
			cell.value = '';
			cell.sprite = null;
		});
		this.currentPlayer = gameValues.cross;
		this.isGameOver = false;
		this.winner = null;
	}

	setCellValue(index, value) {
		if (index >= 0 && index < this.board.length) {
			this.board[index].value = value;
		}
	}

	getCellValue(index) {
		return this.board[index]?.value || '';
	}

	switchPlayer() {
		this.currentPlayer =
			this.currentPlayer === gameValues.cross
				? gameValues.zero
				: gameValues.cross;
	}

	setGameOver(winner = null) {
		this.isGameOver = true;
		this.winner = winner;
	}
}

export const gameState = new GameState();

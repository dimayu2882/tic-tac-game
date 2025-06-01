export const stateBoard = [
	{ row: 0, col: 0, value: '', isWinning: false, sprite: null },
	{ row: 0, col: 1, value: '', isWinning: false, sprite: null },
	{ row: 0, col: 2, value: '', isWinning: false, sprite: null },
	{ row: 1, col: 0, value: '', isWinning: false, sprite: null },
	{ row: 1, col: 1, value: '', isWinning: false, sprite: null },
	{ row: 1, col: 2, value: '', isWinning: false, sprite: null },
	{ row: 2, col: 0, value: '', isWinning: false, sprite: null },
	{ row: 2, col: 1, value: '', isWinning: false, sprite: null },
	{ row: 2, col: 2, value: '', isWinning: false, sprite: null }
];

export const gameState = {
	currentPlayer: 'cross',
	isGameOver: false,
	winner: null
};

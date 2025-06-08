import { Assets } from 'pixi.js';
import { allTextureKeys } from './common/assets.js';
import { createApp } from './core/app.js';
import { loadAppAssets } from './game/loadAppAssets.js';
import { resetPlayAgainButton } from './game/logic.js';
import { setupGame } from './game/setup.js';
import { gameState, stateBoard } from './game/stateGame.js';

class Game {
  constructor() {
    this.CONTAINER_ID = 'pixi-container';
    this.PRELOADER_ID = 'preloader';
    this.app = null;
    this.isGameStarting = false;
  }

  /**
   * Resets the game state and cleans up resources
   */
  async resetGame() {
    if (!this.app?.stage) return;

    try {
      resetPlayAgainButton();

      // Сначала удаляем все текстуры из кэша
      Object.values(allTextureKeys).forEach((key) => {
        if (Assets.cache.has(key)) {
          Assets.unload(key);
        }
      });

      // Затем уничтожаем все дочерние элементы
      this.app.stage.children.forEach((child) => {
        if (child.destroy) {
          child.destroy({
            children: true,
            texture: false,
            baseTexture: false,
          });
        }
      });
      this.app.stage.removeChildren();

      this.app.stage.interactiveChildren = true;

      // Clean up event listeners
      if (this.app.renderer?.events?.removeAllListeners) {
        this.app.renderer.events.removeAllListeners();
      }

      // Reset game state
      stateBoard.forEach((state) => {
        state.value = '';
        state.isWinning = false;
        state.sprite = null;
      });

      Object.assign(gameState, {
        currentPlayer: 'cross',
        isGameOver: false,
        winner: null,
      });
    } catch (error) {
      console.error('Error during game reset:', error);
      throw error;
    }
  }

  /**
   * Displays error message to user
   * @param {Error} error - The error to display
   */
  showError(error) {
    const preloader = document.getElementById(this.PRELOADER_ID);
    if (preloader) {
      preloader.innerHTML = `
				<div style="color: red; padding: 20px; background: white; border: 1px solid red;">
					<h3>Ошибка загрузки игры</h3>
					<p>${error.message}</p>
					<button onclick="location.reload()" style="padding: 10px; margin-top: 10px;">Перезагрузить</button>
				</div>
			`;
    }
  }

  /**
   * Initializes and starts the game
   */
  async startGame() {
    if (this.isGameStarting) return;

    this.isGameStarting = true;

    try {
      if (this.app) {
        await this.resetGame();
      } else {
        const container = document.getElementById(this.CONTAINER_ID);

        if (!container) {
          throw new Error(`${this.CONTAINER_ID} element not found`);
        }

        container.innerHTML = '';
        this.app = await createApp();

        if (!this.app.canvas) {
          throw new Error('Canvas not created');
        }

        container.appendChild(this.app.canvas);
      }

      await Promise.all([loadAppAssets(), setupGame(this.app)]);
    } catch (error) {
      console.error('Game initialization error:', error);
      this.showError(error);
      throw error;
    } finally {
      this.isGameStarting = false;
    }
  }

  /**
   * Restarts the game
   */
  async restartGame() {
    await this.startGame();
  }
}

// Create and start the game
const game = new Game();

// Initialize game
(async () => {
  try {
    await game.startGame();
  } catch (error) {
    console.error('Failed to start game:', error);
  }
})();

export { game };

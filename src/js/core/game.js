import { CONFIG } from "@/const/gameConfig";
import GameState from "@/js/modules/gameState"
import CanvasManager from "@/js/modules/canvasManager"
import MazeGenerator from "@/js/modules/mazeGenerator"
import BulletManager from "@/js/modules/bulletManager"
import Player from "@/js/modules/player"
import InputHandler from "@/js/modules/inputHandler"
import ItemsManager from "@/js/modules/itemsManager";
import { GAME_ITEMS } from "@/const/gameConfig";

class Game {
    constructor(config) {
        this.gameState = new GameState(config.size, 40, CONFIG.PLAY_MODE.BATTLE_MAZE);
        this.canvasManager = new CanvasManager(config.map, config.size, this.gameState.cellSize);
        this.mazeGenerator = new MazeGenerator(config.size);
        this.gameLoop = this.gameLoop.bind(this);
        this.itemsManager = new ItemsManager(config);
    }

    run() {
        if (!this.canvasManager.canvas) return;

        this.gameState.bulletManager = new BulletManager(
            this.canvasManager.ctx,
            this.gameState.gameSize,
            this.gameState.gameSize);

        this.gameState.player = new Player(
            CONFIG.COLORS.RED,
            this.canvasManager.ctx,
            this.gameState.positionX,
            this.gameState.positionY,
            this.gameState.cellSize
        );

        if (this.gameState.currentGameMode.id === CONFIG.PLAY_MODE.BATTLE_MAZE.id) {
            this.gameState.mapGrid = this.mazeGenerator.createMap(this.gameState.currentGameMode.init);
            this.itemsManager.run(this.gameState.mapGrid, this.gameState.currentGameMode);

            this.inputHandler = new InputHandler(
                this.canvasManager.canvas,
                this.gameState,
                this.gameState.player
            );
        }

        this.gameLoop();
    }

    gameLoop() {
        this.canvasManager.clear();
        this.drawMap();
        this.drawItems();

        this.gameState.player.update(
            this.gameState.positionX,
            this.gameState.positionY
        );

        this.gameState.bulletManager.update();
        requestAnimationFrame(this.gameLoop);
    }

    drawMap() {
        for (let i = 0; i < this.gameState.size; i++) {
            for (let j = 0; j < this.gameState.size; j++) {
                this.canvasManager.drawStroke(i, j);
            }
        }
    }

    drawItems() {
        for (let i = 0; i < this.gameState.size; i++) {
            for (let j = 0; j < this.gameState.size; j++) {
                if (this.gameState.mapGrid[i][j].value === 0) {
                    this.canvasManager.drawCell(i, j, CONFIG.COLORS.GRAY);
                }
                if (this.gameState.mapGrid[i][j].value === GAME_ITEMS.FIRE) {
                    this.canvasManager.drawFire(i, j);
                }
            }
        }
    }
}

export default Game;
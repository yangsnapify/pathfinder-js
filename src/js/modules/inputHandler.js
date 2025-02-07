import { CONFIG } from "@/const/gameConfig";
import { GAME_ITEMS } from "@/const/gameConfig";

class InputHandler {
    constructor(canvas, gameState, player) {
        this.canvas = canvas;
        this.gameState = gameState;
        this.player = player;
        this.setupControls();
    }

    setupControls() {
        this.setupKeyboardControls();
        this.setupMouseControls();
    }

    setupKeyboardControls() {
        this.canvas.addEventListener("keydown", (e) => {
            const { DIRECTION } = CONFIG;
            const moves = {
                [DIRECTION.MOVE_UP]: () => this.checkMove(0, -1),
                [DIRECTION.MOVE_DOWN]: () => this.checkMove(0, 1),
                [DIRECTION.MOVE_LEFT]: () => this.checkMove(-1, 0),
                [DIRECTION.MOVE_RIGHT]: () => this.checkMove(1, 0),
            };

            if (moves[e.key]) {
                moves[e.key]();
            }
        });
    }

    setupMouseControls() {
        this.canvas.addEventListener("click", (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            const playerScreenX = this.gameState.positionX * this.gameState.cellSize + this.gameState.cellSize / 2;
            const playerScreenY = this.gameState.positionY * this.gameState.cellSize + this.gameState.cellSize / 2;

            const angle = Math.atan2(
                mouseY - playerScreenY,
                mouseX - playerScreenX
            );

            this.gameState.bulletManager.createBullet(playerScreenX, playerScreenY, angle);
        });
    }

    checkMove(dx, dy) {
        const newX = this.gameState.positionX + dx;
        const newY = this.gameState.positionY + dy;

        if (
            newX >= 0 &&
            newX < this.gameState.size &&
            newY >= 0 &&
            newY < this.gameState.size &&
            this.gameState.mapGrid[newX][newY].value !== GAME_ITEMS.OBSTACLE
        ) {
            this.player.clear(this.gameState.positionX, this.gameState.positionY);
            this.gameState.positionX = newX;
            this.gameState.positionY = newY;
            this.player.update(newX, newY);
        }
    }
}
export default InputHandler;
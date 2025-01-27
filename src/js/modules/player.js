import { CONFIG } from "@/const/gameConfig";

class Player {
    constructor(color, ctx, px, py, cellSize) {
        this.color = color;
        this.ctx = ctx;
        this._posX = px;
        this._posY = py;
        this._cellSize = cellSize;
    }

    update(x, y) {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(x * this._cellSize + this._cellSize / 2, y * this._cellSize + this._cellSize / 2, 10, 0, 2 * Math.PI);
        this.ctx.fill();
    }

    clear(x, y) {
        const ctx = this.ctx;
        const prevX = x * this._cellSize;
        const prevY = y * this._cellSize;

        ctx.clearRect(prevX, prevY, this._cellSize, this._cellSize);
        ctx.fillStyle = CONFIG.COLORS.GRAY;
        ctx.fillRect(x * this._cellSize, y * this._cellSize, this._cellSize, this._cellSize);
    }
}
export default Player;
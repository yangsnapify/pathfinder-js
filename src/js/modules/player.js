import { CONFIG } from "@/const/gameConfig";

class Player {
    constructor(color, ctx, px, py, cellSize) {
        this.color = color;
        this.ctx = ctx;
        this._posX = px;
        this._posY = py;
        this._cellSize = cellSize;
        this.health = 30;
        this.maxHealth = 100;
    }

    update(x, y) {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(x * this._cellSize + this._cellSize / 2, y * this._cellSize + this._cellSize / 2, 10, 0, 2 * Math.PI);
        this.ctx.fill();
        this.drawHealthBar(x, y)
    }

     drawHealthBar(x, y) {
        let barHeight = 8;
        let barWidth = 30
        let barX = x * this._cellSize + (this._cellSize - barWidth) / 2;
        let barY = y * this._cellSize - 5;
    
        let healthWidth = (this.health / this.maxHealth) * barWidth
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(barX, barY, healthWidth, barHeight);
    
        this.ctx.strokeStyle = "black";
        this.ctx.strokeRect(barX, barY, barWidth, barHeight);
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
import { CONFIG } from "@/const/gameConfig";

class CanvasManager {
    constructor(canvas, size, cellSize) {
        this.canvas = canvas;
        this.size = size;
        this.cellSize = cellSize;
        this.ctx = this.initCanvas();
    }

    initCanvas() {
        this.canvas.setAttribute("tabindex", "0");
        this.canvas.focus();
        this.canvas.width = this.size * this.cellSize;
        this.canvas.height = this.size * this.cellSize;
        return this.canvas.getContext("2d");
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawCell(x, y, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(
            x * this.cellSize,
            y * this.cellSize,
            this.cellSize,
            this.cellSize
        );
    }

    drawFire(x, y) {
        this.ctx.font = "38px Arial";
        this.ctx.fillText(
            "🔥",
            x * this.cellSize - 5,
            y * this.cellSize - 7,
        );
    }

    drawStroke(x, y) {
        this.ctx.strokeStyle = CONFIG.COLORS.BLACK;
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(
            x * this.cellSize,
            y * this.cellSize,
            this.cellSize,
            this.cellSize
        );
    }
}
export default CanvasManager;
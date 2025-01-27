class GameState {
    constructor(size, cellSize, gameMode) {
        this.size = size;
        this.cellSize = cellSize;
        this.currentGameMode = gameMode;
        this.positionX = gameMode.pos.x;
        this.positionY = gameMode.pos.y;
        this.mapGrid = null;
        this.cache = new Map();
        this.gameSize = this.size * this.cellSize;
    }

    saveState() {
        const gameState = {
            currentMapGrid: this.mapGrid,
            currentPlayerX: this.positionX,
            currentPlayerY: this.positionY,
        };
        this.cache.set(`${this.currentGameMode.id}_${new Date().getTime()}`, gameState);
    }
}
export default GameState;
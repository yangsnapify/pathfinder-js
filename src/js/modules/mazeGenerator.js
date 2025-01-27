class MazeGenerator {
    constructor(size) {
        this.size = size;
    }

    createMap(initFunction) {
        return Array.from({ length: this.size }, (_, i) =>
            Array.from({ length: this.size }, (_, j) => ({
                x: i,
                y: j,
                value: initFunction(i, j),
            }))
        );
    }

    generateTimerMaze(mapGrid) {
        const dfs = (x, y) => {
            mapGrid[x][y].value = 0;

            const edges = [
                [0, 2],
                [0, -2],
                [2, 0],
                [-2, 0],
            ].sort(() => Math.random() - 0.5);

            for (let [dx, dy] of edges) {
                const newX = x + dx;
                const newY = y + dy;
                if (
                    newX >= 0 &&
                    newX < this.size &&
                    newY >= 0 &&
                    newY < this.size &&
                    mapGrid[newX][newY].value === 1
                ) {
                    mapGrid[Math.floor(x + dx / 2)][Math.floor(y + dy / 2)].value = 0;
                    dfs(newX, newY);
                }
            }
        };

        dfs(1, 1);
        return mapGrid;
    }
}
export default MazeGenerator;
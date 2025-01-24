(function (global) {
  const isNode = typeof window === "undefined";

  const Direction = {
    MOVE_UP: "ArrowUp",
    MOVE_DOWN: "ArrowDown",
    MOVE_LEFT: "ArrowLeft",
    MOVE_RIGHT: "ArrowRight",
  };

  const GAME_ITEMS = {
    FREEZE: "FREEZE",
    BOOST: "BOOST"
  }

  const PLAY_MODE = {
    TIMER_MAZE: {
      id: "TIMER_MAZE",
      init: () => 1,
      pos: { x: 1, y: 1 }
    },
    BATTLE_MAZE: {
      id: "BATTLE_MAZE",
      init: (x, y) => x % 2 === 0 || y % 2 === 0 ? 0 : 1,
      pos: { x: 0, y: 0 }
    }
  }

  class Path {
    constructor(config) {
      this.conf = {
        canvasMap: config.map,
        size: config.size,
      };

      this.state = {
        mapGrid: null,
        currentGameMode: PLAY_MODE.BATTLE_MAZE,
        cellSize: 40,
        positionX: 0,
        positionY: 0,
        cache: new Map()
      };
    }

    clearCvs(d) {
      const { cvs, ctx } = d;
      ctx.clearRect(0, 0, cvs.width, cvs.height);
    }

    saveGameState() {
      const _gameState = {
        currentMapGrid: this.state.mapGrid,
        currentPlayerX: this.state.positionX,
        currentPlayerY: this.state.positionY
      }
      this.state.cache.set(`${this.state.currentGameMode.id}_${new Date().getTime()}`, _gameState);
    }

    run() {
      if (!this.conf.canvasMap) return;
      const d = this.initCanvasData();
      this.saveGameState();
      this.clearCvs(d);
  
      if (this.state.currentGameMode.id === PLAY_MODE.BATTLE_MAZE.id) {
        this.state.mapGrid = this.createMap();
        this.drawCvs(d);
        this.setUpControls(d);
        this.drawObstacles(d);
        this.updatePlayerPos(d);
      }

      if (this.state.currentGameMode.id === PLAY_MODE.TIMER_MAZE.id) {
        this.state.mapGrid = this.createMap();
        this.drawCvs(d);
        this.generateTimerMaze(d);
      }
    }

    createMap() {
      const { init } = this.state.currentGameMode;

      return Array.from({ length: this.conf.size }, (_, i) =>
        Array.from({ length: this.conf.size }, (_, j) => ({
          x: i,
          y: j,
          value: init(i, j),
        }))
      );
    }

    initCanvasData() {
      const cvs = this.conf.canvasMap;
      cvs.setAttribute("tabindex", "0");
      cvs.focus();
      cvs.width = this.conf.size * this.state.cellSize;
      cvs.height = this.conf.size * this.state.cellSize;
      const ctx = cvs.getContext("2d");
      return { cvs, ctx };
    }

    drawCell(cur, v) {
      const { ctx } = v;
      ctx.fillRect(cur.x * this.state.cellSize, cur.y * this.state.cellSize, this.state.cellSize, this.state.cellSize);
    }
    drawStroke(cur, v) {
      const { ctx } = v;
      ctx.strokeStyle = "black";
      ctx.lineWidth = 1;
      ctx.strokeRect(cur.x * this.state.cellSize, cur.y * this.state.cellSize, this.state.cellSize, this.state.cellSize);
    }

    drawCvs(v) {
      for (let i = 0; i < this.conf.size; i++) {
        for (let j = 0; j < this.conf.size; j++) {
          const cur = this.state.mapGrid[i][j];
          this.drawStroke(cur, v);
        }
      }
    }

    setUpControls(v) {
      const { cvs, ctx } = v;

      cvs.addEventListener("keydown", (e) => {
        const prevX = this.state.positionX * this.state.cellSize;
        const prevY = this.state.positionY * this.state.cellSize;

        // Clear Previous Arc Position
        ctx.clearRect(prevX, prevY, this.state.cellSize, this.state.cellSize);
        ctx.fillStyle = "gray";
        this.drawCell({ x: this.state.positionX, y: this.state.positionY }, v);

        switch (e.key) {
          case Direction.MOVE_UP:
            this.state.positionY = Math.max(0, this.state.positionY - 1);
            break;
          case Direction.MOVE_DOWN:
            this.state.positionY = Math.min(this.conf.size - 1, this.state.positionY + 1);
            break;
          case Direction.MOVE_LEFT:
            this.state.positionX = Math.max(0, this.state.positionX - 1);
            break;
          case Direction.MOVE_RIGHT:
            this.state.positionX = Math.min(this.conf.size - 1, this.state.positionX + 1);
            break;
        }
        this.updatePlayerPos(v);
      });
    }

    updatePlayerPos(v) {
      const { ctx } = v;
      ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.arc(this.state.positionX * this.state.cellSize + this.state.cellSize / 2, this.state.positionY * this.state.cellSize + this.state.cellSize / 2, 10, 0, 2 * Math.PI);
      ctx.fill();
    }

    generateTimerMaze(v) {
      const that = this;

      function _dfs(x, y) {
        that.state.mapGrid[x][y].value = 0;

        const directions = [
          [0, 2],
          [0, -2],
          [2, 0],
          [-2, 0],
        ].sort(() => Math.random() - 0.5);

        for (let [dx, dy] of directions) {
          const newX = x + dx;
          const newY = y + dy;
          if (newX >= 0 && newX < that.conf.size && newY >= 0 && newY < that.conf.size && that.state.mapGrid[newX][newY].value === 1) {
            that.state.mapGrid[Math.floor(x + dx / 2)][Math.floor(y + dy / 2)].value = 0;
            // console.log("row", `${x},${y}`, "direction", `${dx},${dy}`, "newxy", `${newX},${newY}`);
            _dfs(newX, newY);
          }
        }
      }
      _dfs(1, 1);
      this.drawObstacles(v)
    }

    drawObstacles(v) {
      const { ctx } = v;
      for (let i = 0; i < this.conf.size; i++) {
        for (let j = 0; j < this.conf.size; j++) {
          if (this.state.mapGrid[i][j].value === 0) {
            ctx.fillStyle = "gray";
            ctx.fillRect(i * this.state.cellSize, j * this.state.cellSize, this.state.cellSize, this.state.cellSize);
          }
        }
      }
    }
  }

  if (isNode) {
    module.exports = Path;
  } else {
    global.Path = Path;
  }
})(globalThis);

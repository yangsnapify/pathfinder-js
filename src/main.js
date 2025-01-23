(function (global) {
  const isNode = typeof window === "undefined";

  const Direction = {
    MOVE_UP: "ArrowUp",
    MOVE_DOWN: "ArrowDown",
    MOVE_LEFT: "ArrowLeft",
    MOVE_RIGHT: "ArrowRight",
  };

  class Path {
    constructor(config) {
      this.conf = {
        canvasMap: config.map,
        size: config.size,
      };

      this.state = {
        mapGrid: null,
        cellSize: 40,
        positionX: 0,
        positionY: 0,
      };
    }

    run() {
      if (!this.conf.canvasMap) return;
      this.state.mapGrid = this.createMap();
      const d = this.initCanvasData();
      this.drawCvs(d);
      this.setUpControls(d);
      this.generateObstacles(d);
      this.drawObstacles(d);
    }

    createMap() {
      return Array.from({ length: this.conf.size }, (_, i) =>
        Array.from({ length: this.conf.size }, (_, j) => ({
          x: i,
          y: j,
          value: 1,
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
      const { ctx } = v;
      for (let i = 0; i < this.conf.size; i++) {
        for (let j = 0; j < this.conf.size; j++) {
          const cur = this.state.mapGrid[i][j];
          ctx.strokeStyle = "#ddd";
          this.drawStroke(cur, v);
        }
      }
      // ctx.fillStyle = "grey";
      // this.drawCell({ x: 0, y: 0 }, v);
    }

    setUpControls(v) {
      const { cvs } = v;
      cvs.addEventListener("keydown", (e) => {
        switch (e.key) {
          case Direction.MOVE_UP:
            this.state.positionY = Math.max(0, this.state.positionY - this.state.cellSize);
            break;
          case Direction.MOVE_DOWN:
            this.state.positionY = Math.min(cvs.height - this.state.cellSize, this.state.positionY + this.state.cellSize);
            break;
          case Direction.MOVE_LEFT:
            this.state.positionX = Math.max(0, this.state.positionX - this.state.cellSize);
            break;
          case Direction.MOVE_RIGHT:
            this.state.positionX = Math.min(cvs.width - this.state.cellSize, this.state.positionX + this.state.cellSize);
            break;
        }
        // this.update(v);
      });
    }

    update(v) {
      const { ctx } = v;
      ctx.fillStyle = "red";
      ctx.fillRect(this.state.positionX, this.state.positionY, this.state.cellSize, this.state.cellSize);
    }

    generateObstacles(v) {
      const that = this;
      const { ctx } = v;

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
            console.log('row', `${x},${y}`, "direction", `${dx},${dy}`, "newxy", `${newX},${newY}`);
            _dfs(newX, newY);
          }
        }
      }
      _dfs(1, 1);
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

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
        map: config.map,
        moveObj: config.moveObj,
        size: config.size,
      };

      this.state = {
        lastKey: null,
        speed: 40,
        positionX: 0,
        positionY: 0,
      };

      this.setUpControls();
      this.update();
    }

    run() {
      this.setUpGameStyles();
    }

    setUpGameStyles() {
      if (this.conf.map) {
        const px = `${this.conf.size}px`;
        this.conf.map.style.width = px;
        this.conf.map.style.height = px;
        this.conf.map.style.border = "solid";
        this.conf.map.style.position = "relative";
      }
      if (this.conf.moveObj) {
        const px = `${this.state.speed}px`;
        this.conf.moveObj.style.width = px;
        this.conf.moveObj.style.height = px;
        this.conf.moveObj.style.background = "red";
        this.conf.moveObj.style.position = "absolute";
        this.conf.moveObj.style.transition = "all 0.2s ease";
      }
    }

    setUpControls() {
      const bound = this.conf.size - this.state.speed;
      document.addEventListener("keydown", (e) => {
        switch (e.key) {
          case Direction.MOVE_UP:
            this.state.positionY = Math.max(
              0,
              this.state.positionY - this.state.speed
            );
            break;
          case Direction.MOVE_DOWN:
            this.state.positionY = Math.min(
              bound,
              this.state.positionY + this.state.speed
            );
            break;
          case Direction.MOVE_LEFT:
            this.state.positionX = Math.max(
              0,
              this.state.positionX - this.state.speed
            );
            break;
          case Direction.MOVE_RIGHT:
            this.state.positionX = Math.min(
              bound,
              this.state.positionX + this.state.speed
            );
            console.log(this.state.positionX);
            break;
        }
        this.update();
      });
    }

    update() {
      if (this.conf.moveObj) {
        this.conf.moveObj.style.left = `${this.state.positionX}px`;
        this.conf.moveObj.style.top = `${this.state.positionY}px`;
        console.log(this.state.positionX, this.state.positionY);
      }
    }
  }

  if (isNode) {
    module.exports = Path;
  } else {
    global.Path = Path;
  }
})(globalThis);

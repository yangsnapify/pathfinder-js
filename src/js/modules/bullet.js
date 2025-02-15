class Bullet {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = 5;
        this.isDestroy = false;
        this.bounceCount = 0;

        this.dx = Math.cos(angle) * this.speed;
        this.dy = Math.sin(angle) * this.speed;
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = "yellow";
        ctx.fill();
        ctx.closePath();
    }

    setAngle(newAngle) {
        this.angle = newAngle;
        this.dx = Math.cos(newAngle) * this.speed;
        this.dy = Math.sin(newAngle) * this.speed;        
    }

    destroy() {
        this.isDestroy = true;
    }
}
export default Bullet;
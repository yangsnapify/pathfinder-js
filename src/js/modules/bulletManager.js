import Bullet from "@/js/modules/bullet";

class BulletManager {
    constructor(ctx, width, height) {
        this.bullets = [];
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.maxBounce = 3;
    }

    createBullet(x, y, angle) {
        const bullet = new Bullet(x, y, angle);
        this.bullets.push(bullet);
    }

    update() {
        this.bullets = this.bullets.filter(bullet => !bullet.isDestroy);

        for (let bullet of this.bullets) {
            bullet.update();

            const deflectionAngle = (Math.random() * 120 - 60) * Math.PI / 180;

            if (bullet.x <= 0 || bullet.x >= this.width) {
                const baseAngle = bullet.x <= 0 ? 0 : Math.PI;
                bullet.setAngle(baseAngle + deflectionAngle);
                bullet.bounceCount++;
            }
            if (bullet.y <= 0 || bullet.y >= this.height) {
                const baseAngle = bullet.y <= 0 ? Math.PI / 2 : -Math.PI / 2;
                bullet.setAngle(baseAngle + deflectionAngle);
                bullet.bounceCount++;
            }
            if (bullet.bounceCount > this.maxBounce) {
                bullet.destroy();
            }
            bullet.draw(this.ctx);
        }
    }
}

export default BulletManager;
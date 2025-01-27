import Bullet from "@/js/modules/bullet";

class BulletManager {
    constructor(ctx, width, height) {
        this.bullets = [];
        this.ctx = ctx;
        this.width = width;
        this.height = height;
    }

    createBullet(x, y, angle) {
        const bullet = new Bullet(x, y, angle);
        this.bullets.push(bullet);
    }

    update() {
        this.bullets = this.bullets.filter(bullet => !bullet.isDestroy);

        for (let bullet of this.bullets) {
            bullet.update();
            bullet.draw(this.ctx);

            if (bullet.x < 0 || bullet.y < 0 ||
                bullet.x > this.width || bullet.y > this.height) {
                bullet.destroy();
            }
        }
    }
}
export default BulletManager
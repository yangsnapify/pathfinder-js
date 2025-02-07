class FireItem {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 20;
        this.isCollected = false;
    }

    static draw(x, y, ctx) {
        if (!this.isCollected) {
            ctx.fillStyle = "red";
            ctx.fillRect(x, y, this.width, this.height);
        }
    }
}
export default FireItem;
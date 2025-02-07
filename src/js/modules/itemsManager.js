import { GAME_ITEMS } from "@/const/gameConfig";

class ItemsManager {
    constructor(config) {
        this.map = null;
        this.config = null;
        this._size = config.size;
    }

    run(map, mapConfig) {
        if (!map || !mapConfig) return;

        this.map = map;
        this.config = mapConfig;

        if (this.config[GAME_ITEMS.FIRE]) {

            while (this.config[GAME_ITEMS.FIRE] > 0) {
                const left = Math.floor(Math.random() * this._size);
                const right = Math.floor(Math.random() * this._size);
                if (this.map[left][right].value === 0 && left !== 0 && right !== 0) {
                    this.map[left][right] = {
                        x: left,
                        y: right,
                        value: GAME_ITEMS.FIRE
                    };
                    this.config[GAME_ITEMS.FIRE] -= 1;
                }
            }
        }
    }
}
export default ItemsManager;
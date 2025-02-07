
export const GAME_ITEMS = {
    FREEZE: "FREEZE",
    BOOST: "BOOST",
    FIRE: "FIRE",
    OBSTACLE: "OBSTACLE"
}

export const CONFIG = {
    COLORS: {
        GRAY: "gray",
        BLACK: "black",
        RED: "red",
        GREEN: "GREEN"
    },

    DIRECTION: {
        MOVE_UP: "ArrowUp",
        MOVE_DOWN: "ArrowDown",
        MOVE_LEFT: "ArrowLeft",
        MOVE_RIGHT: "ArrowRight",
    },

    PLAY_MODE: {
        TIMER_MAZE: {
            id: "TIMER_MAZE",
            init: () => 1,
            pos: { x: 1, y: 1 },
        },
        BATTLE_MAZE: {
            id: "BATTLE_MAZE",
            init: (x, y) => (x % 2 === 0 || y % 2 === 0 ? 0 : GAME_ITEMS.OBSTACLE),
            pos: { x: 0, y: 0 },
            [GAME_ITEMS.FIRE]: 3,
        },
    }
};
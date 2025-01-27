export const CONFIG = {
    COLORS: {
        GRAY: "gray",
        BLACK: "black",
        RED: "red",
    },

    DIRECTION: {
        MOVE_UP: "ArrowUp",
        MOVE_DOWN: "ArrowDown",
        MOVE_LEFT: "ArrowLeft",
        MOVE_RIGHT: "ArrowRight",
    },

    GAME_ITEMS: {
        FREEZE: "FREEZE",
        BOOST: "BOOST",
    },

    PLAY_MODE: {
        TIMER_MAZE: {
            id: "TIMER_MAZE",
            init: () => 1,
            pos: { x: 1, y: 1 },
        },
        BATTLE_MAZE: {
            id: "BATTLE_MAZE",
            init: (x, y) => (x % 2 === 0 || y % 2 === 0 ? 0 : 1),
            pos: { x: 0, y: 0 },
        },
    }
};
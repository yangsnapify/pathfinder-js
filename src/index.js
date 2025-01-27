
import Game from '@/js/core/game.js';

const canvasMap = document.getElementById('gameCanvas');

const game = new Game({
  map: canvasMap,
  size: 15,
});

game.run();
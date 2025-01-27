
import Path from '@/js/core/main.js';

const canvasMap = document.getElementById('gameCanvas');

const game = new Path({
  map: canvasMap,
  size: 15,
});

game.run();
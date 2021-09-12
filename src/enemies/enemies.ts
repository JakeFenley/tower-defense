import enemy, { Enemy } from './enemy';

import { TILE_SQ } from '../map/map-settings';

const ENEMY_COUNT = 20;
const TIME_BETWEEN_SPAWN = 200;
const ROUND_START_TIME = 10000;

interface Enemies {
  spawn: (level: number) => void;
  reset: () => void;
  animateFrame: () => void;
}

function enemies(ctx: CanvasRenderingContext2D): Enemies {
  let _enemies: Enemy[];
  let _startTime: number;

  const reset = () => {
    _enemies = [];
    _startTime = Date.now();
  };

  const spawn = (level: number) => {
    for (let i = 0; i < ENEMY_COUNT; i++) {
      _enemies.push(enemy(level));
    }
  };

  const animateFrame = () => {
    const elapsedTime = Math.floor(Date.now() - _startTime);
    if (elapsedTime < ROUND_START_TIME) {
      return;
    }
    const enemiesToMove = elapsedTime / TIME_BETWEEN_SPAWN;
    for (let i = 0; i < enemiesToMove && i < _enemies.length; i++) {
      const enemy = _enemies[i];
      enemy.move();

      if (enemy.imageLoaded()) {
        const { x, y } = enemy.getCoords();
        ctx.drawImage(enemy.getImage(), x, y, TILE_SQ, TILE_SQ);
      }
    }
  };

  return {
    spawn: spawn,
    reset: reset,
    animateFrame: animateFrame,
  };
}

export default enemies;

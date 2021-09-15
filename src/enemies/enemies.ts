import enemy, { Enemy } from './enemy';

import { TILE_SQ } from '../map/map-settings';
import { Tile } from '../types';
import store from '../canvas';

const ENEMY_COUNT = 20;
const TIME_BETWEEN_SPAWN = 200;
const ROUND_START_TIME = 0;

export interface Enemies {
  reset: (level: number) => void;
  animateFrame: () => void;
  getEnemies: () => Enemy[];
}

function enemies(): Enemies {
  const ctx = store.getCtx() as CanvasRenderingContext2D;
  let _enemies: Enemy[];
  let _startTime: number;

  const reset = (level: number) => {
    _enemies = [];
    for (let i = 0; i < ENEMY_COUNT; i++) {
      _enemies.push(enemy(level));
    }
    _startTime = Date.now();
  };

  const animateFrame = () => {
    const elapsedTime = Math.floor(Date.now() - _startTime);
    if (elapsedTime < ROUND_START_TIME) {
      return;
    }
    const enemiesToMove = (elapsedTime - ROUND_START_TIME) / TIME_BETWEEN_SPAWN;
    for (let i = 0; i < enemiesToMove && i < _enemies.length; i++) {
      const enemy = _enemies[i];
      enemy.move();

      if (enemy.imgLoaded() && enemy.getHealth() > 0) {
        const { x, y } = enemy.getCoords();
        ctx.drawImage(enemy.getImg(), x, y, TILE_SQ, TILE_SQ);
      }
    }
  };

  return {
    reset,
    animateFrame,
    getEnemies: () => _enemies.filter(enemy => enemy.getHealth() > 0),
  };
}

export default enemies;

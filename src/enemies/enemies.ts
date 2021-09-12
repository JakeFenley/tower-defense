import { ROAD_PATH_COORDS, TILE_SQ } from '../map/map-settings';
import enemy, { Enemy } from './enemy';

const ENEMY_COUNT = 20;
const TIME_BEFORE_INITIAL_MOVE = 200;

interface Enemies {
  spawn: (level: number) => void;
  reset: () => void;
  move: () => void;
  draw: () => void;
}

function enemies(ctx: CanvasRenderingContext2D): Enemies {
  let _enemies: Enemy[];
  let _startTime: number;

  const reset = () => {
    _enemies = [];
    _startTime = Date.now();
  };

  const spawn = (level: number) => {
    for(let i = 0; i < ENEMY_COUNT; i++) {
      _enemies.push(enemy(level))
    }
  };

  const move = () => {
    const enemiesToMove = Math.floor((Date.now() - _startTime) / TIME_BEFORE_INITIAL_MOVE);
    for (let i = 0; i < enemiesToMove && i < _enemies.length; i++) {
      const enemy = _enemies[i];
      enemy.move();
    }
  };

  const draw = () => {
    const enemiesToMove = Math.floor((Date.now() - _startTime) / TIME_BEFORE_INITIAL_MOVE);
    for (let i = 0; i < enemiesToMove && i < _enemies.length; i++) {
      const enemy = _enemies[i];
      if (enemy.imageLoaded()) {
        const { x, y } = enemy.getCoords();
        ctx.drawImage(enemy.getImage(), x, y, TILE_SQ, TILE_SQ);
      }
    }
  };

  return {
    spawn: spawn,
    reset: reset,
    move: move,
    draw: draw,
  };
}

export default enemies;

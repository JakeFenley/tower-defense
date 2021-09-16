import enemy, { IEnemy } from './enemy';

import { TILE_SQ } from '../map/map-settings';
import store from '../canvas';

const ENEMY_COUNT = 70;
const TIME_BETWEEN_SPAWN = 500;
const ROUND_START_TIME = 0;

class Enemies {
  _startTime: number;
  _ctx: CanvasRenderingContext2D;

  constructor() {
    this._ctx = store.getCtx() as CanvasRenderingContext2D;
  }

  static enemies: IEnemy[] = [];
  static getEnemies = () => Enemies.enemies.filter((enemy) => enemy.getHealth() > 0);
  static killEnemy = (enemyToKill: IEnemy) => {
    Enemies.enemies = Enemies.enemies.filter((enemy) => enemy !== enemyToKill);
  };

  reset = (level: number) => {
    Enemies.enemies = [];
    for (let i = 0; i < ENEMY_COUNT; i++) {
      Enemies.enemies.push(enemy(level));
    }
    this._startTime = Date.now();
  };

  _drawHealthBar = (enemy: IEnemy, x: number, y: number) => {
    const healthPercentange = enemy.getHealthPercentage();
    if (healthPercentange > 0.85) {
      this._ctx.fillStyle = 'green';
    } else if (healthPercentange > 0.5) {
      this._ctx.fillStyle = 'orange';
    } else {
      this._ctx.fillStyle = 'red';
    }
    this._ctx.fillRect(x + 3, y - 8, TILE_SQ * healthPercentange - 6, 6);
  };

  animateFrame = () => {
    const elapsedTime = Math.floor(Date.now() - this._startTime);
    if (elapsedTime < ROUND_START_TIME) {
      return;
    }
    const enemiesToMove = (elapsedTime - ROUND_START_TIME) / TIME_BETWEEN_SPAWN;
    for (let i = 0; i < enemiesToMove && i < Enemies.enemies.length; i++) {
      const enemy = Enemies.enemies[i];
      enemy.move();
      if (enemy.imgLoaded() && enemy.getHealth() > 0) {
        const { x, y } = enemy.getCoords();
        this._ctx.drawImage(enemy.getImg(), x, y, TILE_SQ, TILE_SQ);
        this._drawHealthBar(enemy, x, y);
      }
    }
  };
}

export default Enemies;

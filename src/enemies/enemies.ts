import enemy, { IEnemy } from './enemy';

import { TILE_SQ } from '../map/map-settings';
import store from '../canvas';

const ENEMY_COUNT = 5000;
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
    this._startTime = Date.now();

    for (let i = 0; i < ENEMY_COUNT; i++) {
      const newEnemy = enemy(level);
      newEnemy.deployTime = ROUND_START_TIME + i * TIME_BETWEEN_SPAWN;
      Enemies.enemies.push(newEnemy);
    }
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
    Enemies.enemies.forEach((enemy) => {
      if (enemy.deployTime < elapsedTime) {
        enemy.move();
        if (enemy.imgLoaded()) {
          const { x, y } = enemy.getCoords();
          this._ctx.drawImage(enemy.getImg(), x, y, TILE_SQ, TILE_SQ);
          this._drawHealthBar(enemy, x, y);
        }
      }
    });
  };
}

export default Enemies;

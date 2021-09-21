import enemy, { IEnemy } from './enemy';

import store from '../canvas';

const ENEMY_COUNT = 30;
const TIME_BETWEEN_SPAWN = 500;
const ROUND_START_TIME = 0;

class Enemies {
  private ctx: CanvasRenderingContext2D;

  constructor() {
    this.ctx = store.getCtx() as CanvasRenderingContext2D;
  }

  static enemies: IEnemy[] = [];
  static getEnemies = () => Enemies.enemies.filter((enemy) => enemy.getHealth() > 0);
  static killEnemy = (enemyToKill: IEnemy) => {
    Enemies.enemies = Enemies.enemies.filter((enemy) => enemy !== enemyToKill);
  };

  spawn = (level: number) => {
    const dateNow = Date.now();
    for (let i = 0; i < ENEMY_COUNT; i++) {
      const newEnemy = enemy(level);
      newEnemy.deployTime = dateNow + ROUND_START_TIME + i * TIME_BETWEEN_SPAWN;
      Enemies.enemies.push(newEnemy);
    }
  };

  animateFrame = () => {
    const dateNow = Date.now();
    Enemies.enemies.forEach((enemy) => {
      if (enemy.deployTime < dateNow) {
        enemy.animateFrame(this.ctx);
      }
    });
  };
}

export default Enemies;

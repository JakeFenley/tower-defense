import { Enemy } from '../enemies/enemy';
import Projectiles from './projectiles';
import { Tower } from './tower';
import { makeImg } from '../util';

export const ARROW = 'arrow';

const IMAGES: { [key: string]: string } = {
  [ARROW]: '/assets/arrow.png',
};

export class Projectile {
  currX: number;
  currY: number;
  enemyX: number;
  enemyY: number;
  tower: Tower;
  enemy: Enemy;
  img: HTMLImageElement;
  imgLoaded: boolean;

  constructor(tower: Tower, enemy: Enemy) {
    const { x: currX, y: currY } = tower.getCoords();
    const { x: enemyX, y: enemyY } = enemy.getCoords();
    this.currX = currX;
    this.currY = currY;
    this.enemyX = enemyX;
    this.enemyY = enemyY;
    this.imgLoaded = false;
    this.img = makeImg(IMAGES[tower.projectile], () => (this.imgLoaded = true));
    this.enemy = enemy;
  }

  move = () => {
    // const { x: enemyX, y: enemyY } = this.enemy.getCoords();
    const { currX, currY, enemyX, enemyY } = this;
    const stepX = enemyX - currX;
    const stepY = enemyY - currY;
    this.currX = currX + stepX * 0.05;
    this.currY = currY + stepY * 0.05;

    if (Math.abs(enemyX - this.currX) < 15 && Math.abs(enemyY - this.currY) < 15) {
      Projectiles.removeProjectile(this);
    }
  };
}

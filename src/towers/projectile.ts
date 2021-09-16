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
  incX: number;
  incY: number;

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
    this.tower = tower;
    this.incX = (enemyX - currX) / 30;
    this.incY = (enemyY - currY) / 30;
  }

  move = () => {
    const {  enemyX, enemyY, incX, incY } = this;
    this.currX = this.currX + incX;
    this.currY = this.currY + incY;

    if (Math.abs(enemyX - this.currX) < 15 && Math.abs(enemyY - this.currY) < 15) {
      this.enemy.damage(this.tower.damage)
      Projectiles.removeProjectile(this);
    }
  };

}

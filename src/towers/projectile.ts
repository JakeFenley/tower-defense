import { ASSETS } from '../types';
import { IEnemy } from '../enemies/enemy';
import { ITower } from './tower';
import Projectiles from './projectiles';
import { makeImg } from '../util';

export class Projectile {
  currX: number;
  currY: number;
  enemyX: number;
  enemyY: number;
  tower: ITower;
  enemy: IEnemy;
  img: HTMLImageElement;
  imgLoaded: boolean;
  incX: number;
  incY: number;

  constructor(tower: ITower, enemy: IEnemy) {
    const { x: currX, y: currY } = tower.getCoords();
    const { x: enemyX, y: enemyY } = enemy.getCoords();
    this.currX = currX;
    this.currY = currY;
    this.enemyX = enemyX;
    this.enemyY = enemyY;
    this.imgLoaded = false;
    this.img = makeImg(ASSETS[tower.projectile], () => (this.imgLoaded = true));
    this.enemy = enemy;
    this.tower = tower;
    this.incX = (enemyX - currX) / 30;
    this.incY = (enemyY - currY) / 30;
  }

  move = () => {
    const {  enemyX, enemyY, incX, incY } = this;
    this.currX = this.currX + incX;
    this.currY = this.currY + incY;

    if (Math.abs(enemyX - this.currX) < 10 && Math.abs(enemyY - this.currY) < 10) {
      this.enemy.damage(this.tower.damage)
      Projectiles.removeProjectile(this);
    }
  };

}

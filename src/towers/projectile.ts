import { Enemy } from '../enemies/enemy';
import { Tower } from './tower';
import { makeImg } from '../util';

export const ARROW = 'arrow';

const IMAGES: { [key: string]: string } = {
  [ARROW]: '/assets/arrow.png',
};

export class Projectile {
  currX: number;
  currY: number;
  tower: Tower;
  enemy: Enemy;
  img: HTMLImageElement;
  imageLoaded: boolean;

  constructor(tower: Tower, enemy: Enemy) {
    const { x: currX, y: currY } = tower.getCoords();
    this.currX = currX;
    this.currY = currY;
    this.imageLoaded = false;
    this.img = makeImg(IMAGES[tower.projectile], () => (this.imageLoaded = true));
  }
}

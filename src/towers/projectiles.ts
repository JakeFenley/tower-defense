import { IEnemy } from '../enemies/enemy';
import { ITower } from './tower';
import { Projectile } from './projectile';
import { TILE_SQ } from '../map/map-settings';
import store from '../canvas';

export default class Projectiles {
  static projectiles: Projectile[];
  ctx: CanvasRenderingContext2D;

  constructor() {
    Projectiles.projectiles = [];
    this.ctx = store.getCtx() as CanvasRenderingContext2D;
  }

  static removeProjectile = (projectile: Projectile) => {
    Projectiles.projectiles = Projectiles.projectiles.filter((x) => x !== projectile);
  };
  
  static createProjectile = (tower: ITower, enemy: IEnemy) => {
    const projectile = new Projectile(tower, enemy);
    Projectiles.projectiles.push(projectile);
  };
  
  animateFrame = () => {
    Projectiles.projectiles.forEach((projectile) => {
      projectile.move();
      if (projectile.imgLoaded) {
        const { currX: x, currY: y } = projectile;
        this.ctx.drawImage(projectile.img, x, y, TILE_SQ, TILE_SQ);
      }
    });
  };
}

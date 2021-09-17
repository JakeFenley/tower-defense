import tower, { ITower } from './tower';

import Enemies from '../enemies/enemies';
import { TILE_SQ } from '../map/map-settings';
import store from '../canvas';

export default class Towers {
  private ctx: CanvasRenderingContext2D;

  constructor() {
    this.ctx = store.getCtx() as CanvasRenderingContext2D;
  }

  static towers: ITower[] = [];

  static buildTower = (id: number, x: number, y: number) => {
    Towers.towers.push(tower(id, x * TILE_SQ, y * TILE_SQ));
  };

  animateFrame = () => {
    const enemies = Enemies.getEnemies();
    Towers.towers.forEach((tower) => {
      tower.attack(enemies);
      if (tower.imgLoaded()) {
        const { x, y } = tower.getCoords();
        this.ctx.drawImage(tower.getImg(), x, y, TILE_SQ, TILE_SQ);
      }
    });
  };
}


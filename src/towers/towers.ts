import tower, { Tower } from './tower';

import { Enemies } from '../enemies/enemies';
import { TILE_SQ } from '../map/map-settings';
import store from '../canvas';

interface Towers {
  animateFrame: () => void;
}

function towers(enemyController: Enemies): Towers {
  const ctx = store.getCtx() as CanvasRenderingContext2D;
  let _towers: Tower[] = [];

  const buildTower = (id: number) => {
    _towers.push(tower(id, 17 * TILE_SQ, 8 * TILE_SQ));
    _towers.push(tower(id, 15 * TILE_SQ, 8 * TILE_SQ));
    _towers.push(tower(id, 17 * TILE_SQ, 6 * TILE_SQ));
    _towers.push(tower(id, 16 * TILE_SQ, 6 * TILE_SQ));
  };

  const animateFrame = () => {
    const enemies = enemyController.getEnemies()
    _towers.forEach((tower) => {
      tower.attack(enemies)
      if (tower.imgLoaded()) {
        const { x, y } = tower.getCoords();
        ctx.drawImage(tower.getImg(), x, y, TILE_SQ, TILE_SQ);
      }
    });
  };

  buildTower(1);

  return {
    animateFrame: animateFrame,
  };
}

export default towers;

import tower, { Tower } from './tower';

import { TILE_SQ } from '../map/map-settings';
import store from '../store';

interface Towers {
  animateFrame: () => void;
}

function towers(): Towers {
  const ctx = store.getCtx() as CanvasRenderingContext2D;
  let _towers: Tower[] = [];

  const buildTower = (id: number) => {
    _towers.push(tower(id, 10, 10));
  };

  const animateFrame = () => {
    _towers.forEach((tower) => {
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

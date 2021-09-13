import { ROAD_PATH_COORDS, TILE_SQ, TREE_COORDS } from './map-settings';

import { makeImg } from '../util';
import store from '../store';

type grid = {
  x: number;
  y: number;
  imgSrc: string;
};

function buildGrass(width: number, height: number) {
  let grass: grid[] = [];

  for (let x = 0; x < width / TILE_SQ; x++) {
    for (let y = 0; y < height / TILE_SQ; y++) {
      grass.push({
        x: x,
        y: y,
        imgSrc: '/assets/grass_tile.png',
      });
    }
  }

  return grass;
}

function buildRoad() {
  const road: grid[] = ROAD_PATH_COORDS.map((tile) => {
    return {
      ...tile,
      imgSrc: '/assets/desert_tile.png',
    };
  });
  return road;
}

function buildTrees() {
  const road: grid[] = TREE_COORDS.map((tile) => {
    return {
      ...tile,
      imgSrc: '/assets/chestnut_tree.png',
    };
  });
  return road;
}

function map() {
  const canvas = store.getCanvas();
  const ctx = store.getCtx() as CanvasRenderingContext2D;
  const { width, height } = canvas;
  const _base: grid[] = buildGrass(width, height);
  const _road: grid[] = buildRoad();
  const _trees: grid[] = buildTrees();

  const _map: grid[] = [..._base, ..._road, ..._trees];
  const _imgs: { [key: string]: { img: HTMLImageElement; loaded: boolean; x: number; y: number } } = {};

  const draw = () => {
    Object.keys(_imgs).forEach((key) => {
      const img = _imgs[key];
      if (img.loaded) {
        ctx.drawImage(img.img, img.x * TILE_SQ, img.y * TILE_SQ, TILE_SQ, TILE_SQ);
      }
    });
  };

  const _makeHash = (x: number, y: number, src: string) => {
    const imgPathSplit = src.split('/');
    return 'x_' + x + '_y_' + y + '_img_' + imgPathSplit[imgPathSplit.length - 1];
  };

  const _makeImgs = () => {
    _map.forEach((tile) => {
      const hash = _makeHash(tile.x, tile.y, tile.imgSrc);
      const img = makeImg(tile.imgSrc, () => {
        _imgs[hash].loaded = true;
      });
      _imgs[hash] = {
        img: img,
        loaded: false,
        x: tile.x,
        y: tile.y,
      };
    });
  };

  _makeImgs();

  return { draw: draw };
}

export default map;

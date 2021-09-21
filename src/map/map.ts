import { ASSETS, Tile } from '../types';
import { ROAD_PATH_COORDS, TILE_SQ, TREE_COORDS } from './map-settings';

import { makeImg } from '../util';
import store from '../canvas';

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
        imgSrc: ASSETS.GRASS_TILE,
      });
    }
  }

  return grass;
}

function buildTilesFromArray(tileArr: Tile[], assetPath: string) {
  const grid: grid[] = tileArr.map((tile) => {
    return {
      ...tile,
      imgSrc: assetPath,
    };
  });
  return grid;
}

function map() {
  const canvas = store.getCanvas();
  const ctx = store.getCtx() as CanvasRenderingContext2D;
  const { width, height } = canvas;
  const _base: grid[] = buildGrass(width, height);
  const _road: grid[] = buildTilesFromArray(ROAD_PATH_COORDS, ASSETS.DESERT_TILE);
  const _trees: grid[] = buildTilesFromArray(TREE_COORDS, ASSETS.TREE);

  const _map: grid[] = [..._base, ..._road, ..._trees];
  const _imgs: { img: HTMLImageElement; loaded: boolean; x: number; y: number }[] = [];

  const draw = () => {
    _imgs.forEach((img) => {
      if (img.loaded) {
        ctx.drawImage(img.img, img.x * TILE_SQ, img.y * TILE_SQ, TILE_SQ, TILE_SQ);
      }
    });
  };

  const _makeImgs = () => {
    _map.forEach((tile) => {
      const imageObj = {
        loaded: false,
        x: tile.x,
        y: tile.y,
        img: makeImg(tile.imgSrc, () => {
          imageObj.loaded = true;
        }),
      };
      _imgs.push(imageObj);
    });
  };

  _makeImgs();

  return { draw: draw };
}

export default map;

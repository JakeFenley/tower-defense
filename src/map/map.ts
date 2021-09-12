import { ROAD_PATH_COORDS, TILE_SQ, TREE_COORDS } from './map-settings';

type grid = {
  x: number;
  y: number;
  imageSrc: string;
};

function buildGrass(width: number, height: number) {
  let grass: grid[] = [];

  for (let x = 0; x < width / TILE_SQ; x++) {
    for (let y = 0; y < height / TILE_SQ; y++) {
      grass.push({
        x: x,
        y: y,
        imageSrc: '/assets/grass_tile.png',
      });
    }
  }

  return grass;
}

function buildRoad() {
  const road: grid[] = ROAD_PATH_COORDS.map((tile) => {
    return {
      ...tile,
      imageSrc: '/assets/desert_tile.png',
    };
  });
  return road;
}

function buildTrees() {
  const road: grid[] = TREE_COORDS.map((tile) => {
    return {
      ...tile,
      imageSrc: '/assets/chestnut_tree.png',
    };
  });
  return road;
}

function initMap(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  const { width, height } = canvas;
  const _base: grid[] = buildGrass(width, height);
  const _road: grid[] = buildRoad();
  const _trees: grid[] = buildTrees();

  const _map: grid[] = [..._base, ..._road, ..._trees];
  const _images: { [key: string]: { image: HTMLImageElement; loaded: boolean; x: number; y: number } } = {};

  const draw = () => {
    Object.keys(_images).forEach((key) => {
      const image = _images[key];
      if (image.loaded) {
        ctx.drawImage(image.image, image.x * TILE_SQ, image.y * TILE_SQ, TILE_SQ, TILE_SQ);
      }
    });
  };

  const _makeHash = (x: number, y: number, src: string) => {
    const imgPathSplit = src.split('/');
    return 'x_' + x + '_y_' + y + '_img_' + imgPathSplit[imgPathSplit.length - 1];
  };

  const _makeImages = () => {
    _map.forEach((tile) => {
      const img = new Image();
      img.src = tile.imageSrc;
      const hash = _makeHash(tile.x, tile.y, img.src);
      _images[hash] = {
        image: img,
        loaded: false,
        x: tile.x,
        y: tile.y,
      };
      img.onload = () => {
        _images[hash].loaded = true;
      };
    });
  };

  _makeImages();

  return { draw: draw };
}

export default initMap;

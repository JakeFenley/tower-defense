import { ROAD_PATH_COORDS, TILE_SQ } from '../map/map-settings';
import { Tile } from '../types';
import { makeImg } from '../util';

const CHARIZARD = '/assets/charizard.png';

export interface TowerConfigProps {
  name?: string;
  damage?: number;
  speed?: number;
  imgSrc?: string;
}

const TOWERS: {
  [key: number]: TowerConfigProps;
} = {
  1: {
    name: 'Charizard',
    damage: 20,
    speed: 1,
    imgSrc: CHARIZARD,
  },
};

export interface Tower {
  getImage: () => HTMLImageElement;
  getCoords: () => { x: number; y: number };
  imageLoaded: () => boolean;
}

export default function tower(id: number): Tower {
  let _damage = <number>TOWERS[id].damage;
  let _speed = <number>TOWERS[id].speed;
  let _imgLoaded = false;
  let _x: number;
  let _y: number;

  const _image = makeImg(<string>TOWERS[id].imgSrc, () => {
    _imgLoaded = true;
  });

  return {
    getImage: () => _image,
    getCoords: () => ({ x: _x, y: _y }),
    imageLoaded: () => _imgLoaded,
  };
}

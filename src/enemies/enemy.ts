import { ROAD_PATH_COORDS } from '../map/map-settings';
import { Tile } from '../types';
import { convertToTrueCoords, makeImg } from '../util';

const GOBLIN = '/assets/goblin_basic.png';
const BIRD = '/assets/bird.png';
const CHARIZARD = '/assets/charizard.png';
const RIGHT = 'right';
const LEFT = 'left';
const DOWN = 'down';
const UP = 'up';

export interface EnemyConfigProps {
  health?: number;
  speed?: number;
  imgSrc?: string;
}

const ENEMIES: {
  [key: number]: EnemyConfigProps;
} = {
  1: {
    health: 20,
    speed: 0.025,
    imgSrc: GOBLIN,
  },
  2: {
    health: 40,
    speed: 0.025,
    imgSrc: BIRD,
  },
  3: {
    health: 80,
    speed: 0.035,
    imgSrc: CHARIZARD,
  },
};

export interface Enemy {
  move: () => void;
  getImg: () => HTMLImageElement;
  getCoords: () => { x: number; y: number };
  imgLoaded: () => boolean;
}

export default function enemy(level: number): Enemy {
  let _health = <number>ENEMIES[level].health;
  let _speed = <number>ENEMIES[level].speed;
  let _moved = false;
  let _tileIdx = 0;
  let _x: number;
  let _y: number;
  let _direction: string;
  let _nextTile: Tile;
  let _currTile: Tile;
  let _imgLoaded = false;
  const _img = makeImg(<string>ENEMIES[level].imgSrc, () => {
    _imgLoaded = true;
  });

  const _setDirection = () => {
    const nextX = _nextTile.x;
    const nextY = _nextTile.y;

    let max = { val: -1000, key: '' };

    const differences: { [key: string]: number } = {
      [UP]: _y - nextY,
      [DOWN]: nextY - _y,
      [LEFT]: _x - nextX,
      [RIGHT]: nextX - _x,
    };

    Object.keys(differences).forEach((key) => {
      if (differences[key] > max.val) {
        max.val = differences[key];
        max.key = key;
      }
    });

    _direction = max.key;
  };

  const _setInitialMovement = () => {
    _currTile = convertToTrueCoords(ROAD_PATH_COORDS[0]);
    _nextTile = convertToTrueCoords(ROAD_PATH_COORDS[1]);
    _x = _currTile.x;
    _y = _currTile.y;
    _tileIdx = 0;
    _setDirection();
    _moved = true;
  };

  const _setNextTileSet = () => {
    if (_tileIdx < ROAD_PATH_COORDS.length - 2) {
      _tileIdx = _tileIdx + 1;
      _currTile = convertToTrueCoords(ROAD_PATH_COORDS[_tileIdx]);
      _nextTile = convertToTrueCoords(ROAD_PATH_COORDS[_tileIdx + 1]);
      _setDirection();
    } else {
      // possible call game scoring system here.
      _moved = false;
    }
  };

  const _setCoords = () => {
    const stepX = _nextTile.x - _currTile.x;
    const stepY = _nextTile.y - _currTile.y;
    _x = _x + stepX * _speed;
    _y = _y + stepY * _speed;
  };

  const move = () => {
    // Maybe this is controlled at a higher level?
    if (_health <= 0) {
      return;
    }

    if (!_moved) {
      _setInitialMovement();
    }

    if (_direction === LEFT && _x <= _nextTile.x) {
      _setNextTileSet();
    }

    if (_direction === RIGHT && _x >= _nextTile.x) {
      _setNextTileSet();
    }

    if (_direction === DOWN && _y >= _nextTile.y) {
      _setNextTileSet();
    }

    if (_direction === UP && _y <= _nextTile.y) {
      _setNextTileSet();
    }

    _setCoords();
  };

  return {
    move: move,
    getImg: () => _img,
    getCoords: () => ({ x: _x, y: _y }),
    imgLoaded: () => _imgLoaded,
  };
}

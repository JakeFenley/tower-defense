import { finalRoadTileCoords, ROAD_PATH_COORDS, TILE_SQ } from '../map/map-settings';
import { Tile } from '../types';

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
  imageSrc?: string;
}

const ENEMIES: {
  [key: number]: EnemyConfigProps;
} = {
  1: {
    health: 20,
    speed: .025,
    imageSrc: GOBLIN,
  },
  2: {
    health: 40,
    speed: .025,
    imageSrc: BIRD,
  },
  3: {
    health: 80,
    speed: .035,
    imageSrc: CHARIZARD,
  },
};

export interface Enemy {
  move: () => void;
  getImage: () => HTMLImageElement;
  getCoords: () => { x: number; y: number };
  imageLoaded: () => boolean;
}

export default function enemy(level: number): Enemy {
  let _health = <number>ENEMIES[level].health;
  let _speed = <number>ENEMIES[level].speed;
  let _imageLoaded = false;
  let _moved = false;
  let _tileIdx = 0;
  let _x: number;
  let _y: number;
  let _direction: string;
  let _nextTile: Tile;
  let _currTile: Tile;

  const _image = new Image();
  _image.src = <string>ENEMIES[level].imageSrc;
  _image.onload = () => {
    _imageLoaded = true;
  };

  const _convertToTrueCoords = (tile: Tile) => {
    return {
      x: tile.x * TILE_SQ,
      y: tile.y * TILE_SQ
    }
  } 

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
    _currTile = _convertToTrueCoords(ROAD_PATH_COORDS[0]);
    _nextTile = _convertToTrueCoords(ROAD_PATH_COORDS[1]);
    _x = _currTile.x;
    _y = _currTile.y;
    _tileIdx = 0;
    _setDirection();
    _moved = true;
  };

  const _setNextTileSet = () => {
    if (_tileIdx < ROAD_PATH_COORDS.length - 2) {
      _tileIdx = _tileIdx + 1;
      _currTile = _convertToTrueCoords(ROAD_PATH_COORDS[_tileIdx]);
      _nextTile = _convertToTrueCoords(ROAD_PATH_COORDS[_tileIdx + 1]);
      _setDirection();
    } else {
      // possible call game scoring system here.
      _moved = false
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
    if(_health <= 0) {
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
    getImage: () => _image,
    getCoords: () => ({ x: _x, y: _y }),
    imageLoaded: () => _imageLoaded,
  };
}

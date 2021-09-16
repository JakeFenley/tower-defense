import { ROAD_PATH_COORDS } from '../map/map-settings';
import { ASSETS, DIRECTIONS, ENEMIES, Tile } from '../types';
import { convertToTrueCoords, makeImg } from '../util';
export interface Enemy {
  damage: (dmg: number) => void;
  move: () => void;
  getImg: () => HTMLImageElement;
  getCoords: () => { x: number; y: number };
  getHealth: () => number;
  imgLoaded: () => boolean;
  getHealthPercentage: () => number;
}

export default function enemy(level: number): Enemy {
  const maxHealth = <number>ENEMIES[level].health;
  let _health = maxHealth;
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
      [DIRECTIONS.UP]: _y - nextY,
      [DIRECTIONS.DOWN]: nextY - _y,
      [DIRECTIONS.LEFT]: _x - nextX,
      [DIRECTIONS.RIGHT]: nextX - _x,
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
    if (!_moved) {
      _setInitialMovement();
    }

    if (
      (_direction === DIRECTIONS.LEFT && _x <= _nextTile.x) ||
      (_direction === DIRECTIONS.RIGHT && _x >= _nextTile.x) ||
      (_direction === DIRECTIONS.DOWN && _y >= _nextTile.y) ||
      (_direction === DIRECTIONS.UP && _y <= _nextTile.y)
    ) {
      _setNextTileSet();
    }

    _setCoords();
  };

  const damage = (dmg: number) => {
    _health = _health - dmg;
  };

  return {
    damage,
    move,
    getImg: () => _img,
    getCoords: () => ({ x: _x, y: _y }),
    getHealth: () => _health,
    imgLoaded: () => _imgLoaded,
    getHealthPercentage: () => _health / maxHealth,
  };
}

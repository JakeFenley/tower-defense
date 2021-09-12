import { finalRoadTileCoords, ROAD_PATH_COORDS, TILE_SQ } from '../map/map-settings';

const GOBLIN = '/assets/goblin_basic.png';
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
    speed: .01,
    imageSrc: GOBLIN,
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
  let _escaped = false;
  let _x: number;
  let _y: number;
  let _direction: string;
  let _nextTile: { x: number; y: number };
  let _currTile: { x: number; y: number };

  const _image = new Image();
  _image.src = <string>ENEMIES[level].imageSrc;
  _image.onload = () => {
    _imageLoaded = true;
  };

  const _setDirection = () => {
    const nextX = _nextTile.x * TILE_SQ;
    const nextY = _nextTile.y * TILE_SQ;
    let max = { val: -1000, key: '' };
    const differences: { [key: string]: number } = {
      up: _y - nextY,
      down: nextY - _y,
      left: _x - nextX,
      right: nextX - _x,
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
    _tileIdx = 0;
    _currTile = ROAD_PATH_COORDS[0];
    _nextTile = ROAD_PATH_COORDS[1];
    _x = _currTile.x * TILE_SQ;
    _y = _currTile.y * TILE_SQ;
    _setDirection();
    _moved = true;
  };

  const _setNextTileSet = () => {
    if (_tileIdx < ROAD_PATH_COORDS.length - 2) {
      _tileIdx = _tileIdx + 1;
      _currTile = ROAD_PATH_COORDS[_tileIdx];
      _nextTile = ROAD_PATH_COORDS[_tileIdx + 1];
      _setDirection();
    } else {
      _moved = false
    }
  };

  const _setCoords = () => {
    const currX = _currTile.x * TILE_SQ;
    const currY = _currTile.y * TILE_SQ;
    const stepX = _nextTile.x * TILE_SQ - currX;
    const stepY = _nextTile.y * TILE_SQ - currY;

    _x = _x + stepX * _speed;
    _y = _y + stepY * _speed;
  };

  const _moveLeft = () => {
    if (_x <= _nextTile.x * TILE_SQ) {
      _setNextTileSet();
    }
  };
  const _moveRight = () => {
    if (_x >= _nextTile.x * TILE_SQ) {
      _setNextTileSet();
    }
  };
  const _moveDown = () => {
    if (_y >= _nextTile.y * TILE_SQ) {
      _setNextTileSet();
    }
  };
  const _moveUp = () => {
    if (_y <= _nextTile.y * TILE_SQ) {
      _setNextTileSet();
    }
  };

  const move = () => {
    // if(_escaped) {
    //   return;
    // }
    // const { x: finalX, y: finalY } = finalRoadTileCoords;

    // if (_direction === UP && _y <= finalY) {
    //   _escaped = true;
    // }
    // if (_direction === DOWN && _y >= finalY) {
    //   _escaped = true;
    // }
    // if (_direction === RIGHT && _x >= finalX) {
    //   _escaped = true;
    // }
    // if (_direction === LEFT && _x <= finalX) {
    //   _escaped = true;
    // }

    if (!_moved) {
      _setInitialMovement();
    }

    switch (_direction) {
      case UP:
        _moveUp();
        break;
      case DOWN:
        _moveDown();
        break;
      case RIGHT:
        _moveRight();
        break;
      case LEFT:
        _moveLeft();
        break;
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

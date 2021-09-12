"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var map_settings_1 = require("../map/map-settings");
var GOBLIN = '/assets/goblin_basic.png';
var RIGHT = 'right';
var LEFT = 'left';
var DOWN = 'down';
var UP = 'up';
var ENEMIES = {
    1: {
        health: 20,
        speed: 0.03,
        imageSrc: GOBLIN,
    },
};
function enemy(level) {
    var _health = ENEMIES[level].health;
    var _speed = ENEMIES[level].speed;
    var _imageLoaded = false;
    var _moved = false;
    var _tileIdx = 0;
    var _escaped = false;
    var _x;
    var _y;
    var _direction;
    var _nextTile;
    var _currTile;
    var _image = new Image();
    _image.src = ENEMIES[level].imageSrc;
    _image.onload = function () {
        _imageLoaded = true;
    };
    var _setDirection = function () {
        console.log(_nextTile.x * map_settings_1.TILE_SQ);
        var nextX = _nextTile.x * map_settings_1.TILE_SQ;
        var nextY = _nextTile.y * map_settings_1.TILE_SQ;
        if (Math.floor(_x) < nextX) {
            _direction = RIGHT;
        }
        if (Math.floor(_x) > nextX) {
            _direction = LEFT;
        }
        if (Math.floor(_y) < nextY) {
            _direction = DOWN;
        }
        if (Math.floor(_y) > nextY) {
            _direction = UP;
        }
    };
    var _setInitialMovement = function () {
        _currTile = map_settings_1.ROAD_PATH_COORDS[0];
        _nextTile = map_settings_1.ROAD_PATH_COORDS[1];
        _x = _currTile.x * map_settings_1.TILE_SQ;
        _y = _currTile.y * map_settings_1.TILE_SQ;
        _setDirection();
        _moved = true;
    };
    var _setNextTileSet = function () {
        _tileIdx = _tileIdx + 1;
        _currTile = map_settings_1.ROAD_PATH_COORDS[_tileIdx];
        _nextTile = map_settings_1.ROAD_PATH_COORDS[_tileIdx + 1];
        _setDirection();
    };
    var _setCoords = function () {
        var currX = _currTile.x * map_settings_1.TILE_SQ;
        var currY = _currTile.y * map_settings_1.TILE_SQ;
        var stepX = _nextTile.x * map_settings_1.TILE_SQ - currX;
        var stepY = _nextTile.y * map_settings_1.TILE_SQ - currY;
        _x = _x + stepX * _speed;
        _y = _y + stepY * _speed;
    };
    var _moveLeft = function () {
        if (_x <= _nextTile.x * map_settings_1.TILE_SQ) {
            _setNextTileSet();
        }
    };
    var _moveRight = function () {
        if (_x >= _nextTile.x * map_settings_1.TILE_SQ) {
            _setNextTileSet();
        }
    };
    var _moveDown = function () {
        if (_y >= _nextTile.y * map_settings_1.TILE_SQ) {
            _setNextTileSet();
        }
    };
    var _moveUp = function () {
        if (_y <= _nextTile.y * map_settings_1.TILE_SQ) {
            _setNextTileSet();
        }
    };
    var move = function () {
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
        getImage: function () { return _image; },
        getCoords: function () { return ({ x: _x, y: _y }); },
        imageLoaded: function () { return _imageLoaded; },
    };
}
exports.default = enemy;
//# sourceMappingURL=enemy.js.map
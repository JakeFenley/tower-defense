"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var map_settings_1 = require("../map/map-settings");
var enemy_1 = __importDefault(require("./enemy"));
var ENEMY_COUNT = 20;
var TIME_BEFORE_INITIAL_MOVE = 200;
function enemies(ctx) {
    var _enemies;
    var _startTime;
    var reset = function () {
        _enemies = [];
        _startTime = Date.now();
    };
    var spawn = function (level) {
        for (var i = 0; i < ENEMY_COUNT - 1; i++) {
            _enemies.push((0, enemy_1.default)(level));
        }
    };
    var move = function () {
        var enemiesToMove = Math.floor((Date.now() - _startTime) / TIME_BEFORE_INITIAL_MOVE);
        for (var i = 0; i < enemiesToMove && i < _enemies.length; i++) {
            var enemy_2 = _enemies[i];
            enemy_2.move();
        }
    };
    var draw = function () {
        var enemiesToMove = Math.floor((Date.now() - _startTime) / TIME_BEFORE_INITIAL_MOVE);
        for (var i = 0; i < enemiesToMove && i < _enemies.length; i++) {
            var enemy_3 = _enemies[i];
            if (enemy_3.imageLoaded()) {
                var _a = enemy_3.getCoords(), x = _a.x, y = _a.y;
                ctx.drawImage(enemy_3.getImage(), x, y, map_settings_1.TILE_SQ, map_settings_1.TILE_SQ);
            }
        }
    };
    return {
        spawn: spawn,
        reset: reset,
        move: move,
        draw: draw,
    };
}
exports.default = enemies;
//# sourceMappingURL=enemies.js.map
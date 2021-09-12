"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var map_settings_1 = require("./map-settings");
function buildGrass(width, height) {
    var grass = [];
    for (var x = 0; x < width / map_settings_1.TILE_SQ; x++) {
        for (var y = 0; y < height / map_settings_1.TILE_SQ; y++) {
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
    var road = map_settings_1.ROAD_PATH_COORDS.map(function (tile) {
        return __assign(__assign({}, tile), { imageSrc: '/assets/desert_tile.png' });
    });
    return road;
}
function buildTrees() {
    var road = map_settings_1.TREE_COORDS.map(function (tile) {
        return __assign(__assign({}, tile), { imageSrc: '/assets/chestnut_tree.png' });
    });
    return road;
}
function initMap(canvas, ctx) {
    var width = canvas.width, height = canvas.height;
    var _base = buildGrass(width, height);
    var _road = buildRoad();
    var _trees = buildTrees();
    var _map = __spreadArray(__spreadArray(__spreadArray([], _base, true), _road, true), _trees, true);
    var _images = {};
    var draw = function () {
        Object.keys(_images).forEach(function (key) {
            var image = _images[key];
            if (image.loaded) {
                ctx.drawImage(image.image, image.x * map_settings_1.TILE_SQ, image.y * map_settings_1.TILE_SQ, map_settings_1.TILE_SQ, map_settings_1.TILE_SQ);
            }
        });
    };
    var _makeHash = function (x, y, src) {
        var imgPathSplit = src.split('/');
        return 'x_' + x + '_y_' + y + '_img_' + imgPathSplit[imgPathSplit.length - 1];
    };
    var _makeImages = function () {
        _map.forEach(function (tile) {
            var img = new Image();
            img.src = tile.imageSrc;
            var hash = _makeHash(tile.x, tile.y, img.src);
            _images[hash] = {
                image: img,
                loaded: false,
                x: tile.x,
                y: tile.y,
            };
            img.onload = function () {
                _images[hash].loaded = true;
            };
        });
    };
    _makeImages();
    return { draw: draw };
}
exports.default = initMap;
//# sourceMappingURL=map.js.map
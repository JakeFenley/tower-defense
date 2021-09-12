"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var map_1 = __importDefault(require("./map/map"));
var enemies_1 = __importDefault(require("./enemies/enemies"));
function main(canvas) {
    var ctx = canvas.getContext('2d');
    if (!ctx) {
        return;
    }
    var map = (0, map_1.default)(canvas, ctx);
    var enemies = (0, enemies_1.default)(ctx);
    var game = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        map.draw();
        enemies.move();
        enemies.draw();
        requestAnimationFrame(game);
    };
    enemies.reset();
    enemies.spawn(1);
    requestAnimationFrame(game);
}
var canvas = document.querySelector('canvas');
main(canvas);
exports.default = main;
//# sourceMappingURL=index.js.map
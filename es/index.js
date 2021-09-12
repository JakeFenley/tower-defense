import initMap from './map/map';
import makeEnemies from './enemies/enemies';
function main(canvas) {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        return;
    }
    const map = initMap(canvas, ctx);
    const enemies = makeEnemies(ctx);
    const game = () => {
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
const canvas = document.querySelector('canvas');
main(canvas);
export default main;
//# sourceMappingURL=index.js.map
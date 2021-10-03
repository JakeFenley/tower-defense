import Enemies from './enemies/enemies';
import Projectiles from './towers/projectiles';
import Towers from './towers/towers';
import Ui from './ui';
import map from './map/map';
import store from './canvas';

function game() {
  let _canvas: HTMLCanvasElement = store.getCanvas();
  let _ctx = store.getCtx() as CanvasRenderingContext2D;
  let _running = false;
  const mapController = map();
  const enemies = new Enemies();
  const towers = new Towers();
  const projectiles = new Projectiles();
  const ui = new Ui();
  enemies.spawn(1); // todo: implement game system
  setTimeout(() => enemies.spawn(2), 10000)
  setTimeout(() => enemies.spawn(3), 20000)

  const render = () => {
    if (_running) {
      _ctx!.clearRect(0, 0, _canvas!.width, _canvas!.height);
      mapController.draw();
      enemies.animateFrame();
      towers.animateFrame();
      projectiles.animateFrame();
      ui.animateFrame();
      requestAnimationFrame(render);
    }
  };

  const run = () => {
    if (!_running) {
      _running = true;
      requestAnimationFrame(render);
    }
  };

  return {
    run,
  };
}

export default game;

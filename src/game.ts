import Controls from './controls';
import Enemies from './enemies/enemies';
import Projectiles from './towers/projectiles';
import Towers from './towers/towers';
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
  const controls = new Controls();
  enemies.reset(1); // todo: implement game system

  const render = () => {
    if (_running) {
      _ctx!.clearRect(0, 0, _canvas!.width, _canvas!.height);
      mapController.draw();
      enemies.animateFrame();
      towers.animateFrame();
      projectiles.animateFrame();
      controls.animateFrame();
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

import enemies from './enemies/enemies';
import map from './map/map';
import store from './canvas';
import towers from './towers/towers';

function game() {
  let _canvas: HTMLCanvasElement | null = store.getCanvas();
  let _ctx: CanvasRenderingContext2D | null = store.getCtx();
  let _running = false;
  const mapController = map();
  const enemyController = enemies();
  const towerController = towers(enemyController);
  enemyController.reset(1); // todo: implement game system

  const render = () => {
    if (_running) {
      _ctx!.clearRect(0, 0, _canvas!.width, _canvas!.height);
      mapController.draw();
      enemyController.animateFrame();
      towerController.animateFrame();
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

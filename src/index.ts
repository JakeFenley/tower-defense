import game from './game';
import store from './store';

function main() {
  const canvas = document.querySelector('canvas') as HTMLCanvasElement;
  store.setCanvas(canvas);
  const td = game();
  td.run();
}

main();

export default main;

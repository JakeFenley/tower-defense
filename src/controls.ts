import { ROAD_PATH_COORDS, TILE_SQ } from './map/map-settings';
import { debounce, throttle } from 'lodash';

import Towers from './towers/towers';
import store from './canvas';

class Mouse {
  private canvas: HTMLCanvasElement;
  private controls: Controls;
  private ctx: CanvasRenderingContext2D;

  constructor(controls: Controls) {
    this.canvas = store.getCanvas();
    this.ctx = store.getCtx() as CanvasRenderingContext2D;
    this.canvas.addEventListener('mousemove', this.handleMouseMove);
    this.canvas.addEventListener('mouseout', this.nullifyMouseMoveAnimation);
    this.canvas.addEventListener('click', this.handleClick);
    this.controls = controls;
  }

  private isRoadPath = (x: number, y: number) => {
    return ROAD_PATH_COORDS.some((tile) => tile.x === x && tile.y === y);
  };

  private getMouseCoords = (e: MouseEvent) => {
    const { canvas } = this;
    const canvasBCR = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - canvasBCR.left) / TILE_SQ);
    const y = Math.floor((e.clientY - canvasBCR.top) / TILE_SQ);
    return { x, y };
  };

  private handleClick = (e: MouseEvent) => {
    const { x, y } = this.getMouseCoords(e);
    if (this.isRoadPath(x, y)) {
      return;
    }
    Towers.buildTower(1, x, y);
  };

  private handleMouseMove = throttle((e: MouseEvent) => {
    const { controls, ctx } = this;
    const { x, y } = this.getMouseCoords(e);

    if (this.isRoadPath(x, y)) {
      return this.nullifyMouseMoveAnimation();
    }

    controls.mutateAnimation('mouseMove', () => {
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'red';
      ctx.strokeRect(x * TILE_SQ, y * TILE_SQ, TILE_SQ, TILE_SQ);
      ctx.stroke();
    });
  }, 25);

  private nullifyMouseMoveAnimation = () => {
    this.controls.mutateAnimation('mouseMove', null);
  };
}

export default class Controls {
  private mouse: Mouse;
  private animations: { [key: string]: (() => void) | null };
  private ctx: CanvasRenderingContext2D;

  constructor() {
    this.ctx = store.getCtx() as CanvasRenderingContext2D;
    this.mouse = new Mouse(this);
    this.animations = {};
  }

  animateFrame = () => {
    Object.keys(this.animations).forEach((key) => {
      const animation = this.animations[key];
      if (typeof animation === 'function') {
        animation();
      }
    });
  };

  mutateAnimation = (key: string, func: (() => void) | null) => {
    this.animations[key] = func;
  };
}

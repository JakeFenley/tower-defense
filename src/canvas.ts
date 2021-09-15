const canvasStore = () => {
  let _canvas: HTMLCanvasElement;
  let _ctx: CanvasRenderingContext2D | null;

  const setCanvas = (canvas: HTMLCanvasElement) => {
    if (!_canvas) {
      _canvas = canvas;
      _ctx = canvas.getContext('2d');
    } else {
      throw 'Canvas element has already been set';
    }
  };

  const getCanvas = () => _canvas;
  const getCtx = () => _ctx;

  return {
    setCanvas,
    getCanvas,
    getCtx,
  };
};

const store = canvasStore();

export default store;

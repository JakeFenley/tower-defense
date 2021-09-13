const store = () => {
  let _canvas: HTMLCanvasElement;
  let _ctx: CanvasRenderingContext2D | null;

  const setCanvas = (canvas: HTMLCanvasElement) => {
    _canvas = canvas;
    _ctx = canvas.getContext('2d');
  };

  const getCanvas = () => _canvas;
  const getCtx = () => _ctx;

  return {
    setCanvas,
    getCanvas,
    getCtx,
  };
};

const storeInstance = store();

export default storeInstance;

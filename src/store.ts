declare global {
  interface Window {
      __tower_defense__:any;
  }
}

const store = () => {
  
  const setCanvas = (canvas: HTMLCanvasElement) => {
    window.__tower_defense__ = {}
    window.__tower_defense__.canvas = canvas
    window.__tower_defense__.ctx = canvas.getContext('2d');
  };

  const getCanvas = () => window.__tower_defense__.canvas;
  const getCtx = () => window.__tower_defense__.ctx;

  return {
    setCanvas,
    getCanvas,
    getCtx,
  }
}

export default store()

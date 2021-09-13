import { TILE_SQ } from './map/map-settings';
import { Tile } from './types';

export const convertToTrueCoords = (tile: Tile) => {
  return {
    x: tile.x * TILE_SQ,
    y: tile.y * TILE_SQ,
  };
};

export const makeImg = (src: string, callback: () => void) => {
  const img = new Image();
  img.src = src
  img.onload = callback
  return img
}

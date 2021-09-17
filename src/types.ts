/******************************************************************************************************
 ** GENERICS
 */

export type Tile = {
  x: number;
  y: number;
  img?: HTMLImageElement;
};

interface IGameType {
  [key: string]: string;
}

/******************************************************************************************************
 ** DIRECTIONS
 */

export const DIRECTIONS = ((): IGameType => {
  return {
    RIGHT: 'RIGHT',
    LEFT: 'LEFT',
    DOWN: 'DOWN',
    UP: 'UP',
  };
})();

/******************************************************************************************************
 ** ASSETS
 */

export const ASSETS = ((): IGameType => {
  const PATH = '/assets';

  const GOBLIN = `${PATH}/goblin_basic.png`;
  const BIRD = `${PATH}/bird.png`;
  const CHARIZARD = `${PATH}/charizard.png`;
  const FIREBALL = `${PATH}/fireball.png`;

  return {
    GOBLIN,
    BIRD,
    CHARIZARD,
    FIREBALL,
  };
})();

/******************************************************************************************************
 ** PROJECTILES
 */

export const PROJECTILES = ((): IGameType => {
  const FIREBALL = 'FIREBALL';

  return {
    FIREBALL,
  };
})();

/******************************************************************************************************
 ** ENEMIES
 */

interface IEnemyType {
  health?: number;
  speed?: number;
  imgSrc?: string;
}

export const ENEMIES: {
  [key: number]: IEnemyType;
} = {
  1: {
    health: 80,
    speed: 0.025,
    imgSrc: ASSETS.GOBLIN,
  },
  2: {
    health: 40,
    speed: 0.025,
    imgSrc: ASSETS.BIRD,
  },
  3: {
    health: 80,
    speed: 0.035,
    imgSrc: ASSETS.CHARIZARD,
  },
};

/******************************************************************************************************
 ** TOWERS
 */

export interface ITowerType {
  name?: string;
  damage?: number;
  speed?: number;
  imgSrc?: string;
  radius?: number;
  projectile?: string;
}

export const TOWERS: {
  [key: number]: ITowerType;
} = {
  1: {
    name: 'Charizard',
    damage: 1,
    speed: 1,
    imgSrc: ASSETS.CHARIZARD,
    radius: 200,
    projectile: PROJECTILES.FIREBALL,
  },
};

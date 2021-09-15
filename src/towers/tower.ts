import { Enemy } from '../enemies/enemy';
import { Tile } from '../types';
import { makeImg } from '../util';
import { ARROW } from './projectile';
import Projectiles from './projectiles';

const CHARIZARD = '/assets/charizard.png';

export interface TowerConfigProps {
  name?: string;
  damage?: number;
  speed?: number;
  imgSrc?: string;
  radius?: number;
  projectile?: string;
}

const TOWERS: {
  [key: number]: TowerConfigProps;
} = {
  1: {
    name: 'Charizard',
    damage: 15,
    speed: 1,
    imgSrc: CHARIZARD,
    radius: 200,
    projectile: ARROW,
  },
};

export interface Tower {
  getImg: () => HTMLImageElement;
  getCoords: () => Tile;
  imgLoaded: () => boolean;
  attack: (enemies: Enemy[]) => void;
  projectile: string;
}

export default function tower(id: number, x: number, y: number): Tower {
  const projectile = <string>TOWERS[id].projectile;
  let _damage = <number>TOWERS[id].damage;
  let _speed = <number>TOWERS[id].speed;
  let _radius = <number>TOWERS[id].radius;
  let _imgLoaded = false;
  let _ticks = 0;
  let _x = x;
  let _y = y;
  let _focusedEnemy: Enemy | null = null;

  const _img = makeImg(<string>TOWERS[id].imgSrc, () => {
    _imgLoaded = true;
  });

  const _getClosestEnemy = (enemies: Enemy[]) => {
    let prevDistance = 1000000;
    const enemy = enemies.reduce((prev, curr) => {
      let isWithinDistance = false;
      const { x: enemyX, y: enemyY } = curr.getCoords();
      const distX = Math.abs(_x - enemyX);
      const distY = Math.abs(_y - enemyY);
      const currDistance = distY + distX;
      if (distX < _radius && distY < _radius) {
        isWithinDistance = true;
      }

      if (!prev && isWithinDistance) {
        return curr;
      } else if (prev && isWithinDistance && prevDistance > currDistance) {
        prevDistance = distX + distY;
        return curr;
      } else if (prev) {
        return prev;
      } else {
        return null;
      }
    }, null);

    return enemy;
  };

  const _doAttackSideEffects = () => {
    if (_focusedEnemy) {
      _focusedEnemy.damage(_damage);
      Projectiles.createProjectile(tower, _focusedEnemy);
      if (_focusedEnemy.getHealth() <= 0) {
        _focusedEnemy = null;
      }
    }
  };

  const attack = (enemies: Enemy[]) => {
    _ticks++;

    if (_ticks! % 30) {
      return;
    }

    if (_focusedEnemy) {
      const { x: enemyX, y: enemyY } = _focusedEnemy.getCoords();
      const distX = Math.abs(_x - enemyX);
      const distY = Math.abs(_y - enemyY);
      if (distX < _radius && distY < _radius) {
        _doAttackSideEffects();
      } else {
        _focusedEnemy = null;
      }
    }

    if (!_focusedEnemy) {
      _focusedEnemy = _getClosestEnemy(enemies);
      if (_focusedEnemy) {
        _doAttackSideEffects();
      }
    }
  };

  const tower = {
    getImg: () => _img as HTMLImageElement,
    getCoords: () => <Tile>{ x: _x, y: _y },
    imgLoaded: () => _imgLoaded,
    attack,
    projectile,
  };

  return tower;
}

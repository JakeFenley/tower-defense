import { Enemy } from '../enemies/enemy';
import { Tile, TOWERS } from '../types';
import { makeImg } from '../util';
import Projectiles from './projectiles';

export interface Tower {
  getImg: () => HTMLImageElement;
  getCoords: () => Tile;
  imgLoaded: () => boolean;
  attack: (enemies: Enemy[]) => void;
  projectile: string;
  damage: number;
}

export default function tower(id: number, x: number, y: number): Tower {
  const projectile = <string>TOWERS[id].projectile;
  const damage = <number>TOWERS[id].damage;
  const _speed = <number>TOWERS[id].speed;
  const _radius = <number>TOWERS[id].radius;
  const _x = x;
  const _y = y;
  let _imgLoaded = false;
  let _ticks = 0;
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
      Projectiles.createProjectile(tower, _focusedEnemy);
      if (_focusedEnemy.getHealth() <= 0) {
        _focusedEnemy = null;
      }
    }
  };

  const attack = (enemies: Enemy[]) => {
    _ticks++;

    if (_ticks! % 15) {
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
    damage,
  };

  return tower;
}

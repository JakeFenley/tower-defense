import { Enemy } from "../enemies/enemy";
import { Projectile } from "./projectile";
import { Tower } from "./tower";

class Projectiles {
  projectiles: Projectile[];

  constructor(){
    this.projectiles = []
  }

  animateFrame = () => {
    ///
  }

  createProjectile = (tower: Tower, enemy: Enemy) => {
    const projectile = new Projectile(tower, enemy)
    this.projectiles.push(projectile)
  }
}
import { getTimestamp } from "../utils/functions";

import Projectile from "./Projectile";

class Projectiles extends Phaser.Physics.Arcade.Group {
  timeFromLastProjectile = null;

  constructor(scene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      frameQuantity: 5,
      active: false,
      visible: false,
      key: "fireball",
      classType: Projectile,
    });
  }

  fireProjectile(initiator) {
    const projectile = this.getFirstDead(false);

    if (!projectile) {
      return;
    }

    if (
      this.timeFromLastProjectile &&
      projectile.cooldown + this.timeFromLastProjectile > getTimestamp()
    ) {
      this.scene.sound.play("missed", { volume: 1 });
      return;
    }

    const center = initiator.getCenter();
    let centerX;

    if (initiator.lastDirection === Phaser.Physics.Arcade.FACING_RIGHT) {
      projectile.speed = Math.abs(projectile.speed);
      projectile.setFlipX(false);
      centerX = center.x + 20;
    } else {
      projectile.speed = -Math.abs(projectile.speed);
      projectile.setFlipX(true);
      centerX = center.x - 20;
    }

    initiator.play("lafull-attack2", true);

    const playerLastDirection = Phaser.Physics.Arcade.FACING_RIGHT === initiator.lastDirection ? "right" : "left";
    projectile.fire(centerX, center.y, playerLastDirection);
    this.timeFromLastProjectile = getTimestamp();
  }
}

export default Projectiles;

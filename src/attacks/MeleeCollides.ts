class MeleeCollides extends Phaser.Physics.Arcade.Sprite {
  damageBetween: [number, number] = [20, 30];
  initiator: any;
  knuckBack: boolean;

  constructor(scene, x, y, initiator, height = 50, width = 50) {
    super(scene, x, y, "meleeColides");

    scene.physics.add.existing(this);

    this.initiator = initiator;
    this.displayHeight = height;
    this.displayWidth = width;
  }

  async swing(x, y, height, width, knuckBack = false) {
    this.setSize(width, height);
    this.x = x;
    this.y = y;

    this.knuckBack = knuckBack;

    const center = this.initiator.getCenter();

    if (this.initiator.lastDirection === Phaser.Physics.Arcade.FACING_RIGHT) {
      this.x = center.x + 30;
    } else {
      this.x = center.x - 30;
    }

    this.activeteWeapon(true);
    await this.scene.setDelay(100);
    this.activeteWeapon(false);
    this.body?.reset(-150, -150);
  }

  deliversHit(target) {
    this.setActive(false);

    if (this.knuckBack) {
      const selectedDamage = Phaser.Math.Between(40, 60)

      this.damage = selectedDamage
      
      const randomVelocityY = Math.random() * -200 - 230;
      const randomLeftOrRight = Math.random() > 0.5 ? 1 : -1;
      const randomVelocityX = Math.random() * 100 * randomLeftOrRight;
      target.setVelocityY(randomVelocityY);
      target.setVelocityX(randomVelocityX);
    }

    this.body?.reset(-150, -150);
  }

  activeteWeapon(isActive) {
    this.setActive(false);
  }
}

export default MeleeCollides;

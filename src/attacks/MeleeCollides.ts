class MeleeCollides extends Phaser.Physics.Arcade.Sprite {
  damage: number = 15;
  initiator: any;

  constructor(scene, x, y, initiator, height = 50, width = 50) {
    super(scene, x, y, "meleeColides");

    scene.physics.add.existing(this);

    this.initiator = initiator;
    this.displayHeight = height;
    this.displayWidth = width;
    this.swing();
  }

  async swing() {
    const center = this.initiator.getCenter();

    if (this.initiator.lastDirection === Phaser.Physics.Arcade.FACING_RIGHT) {
      this.x = center.x + 30;
    } else {
      this.x = center.x - 30;
    }

    this.activeteWeapon(true);
    await this.scene.setDelay(100);
    this.activeteWeapon(false);
    this.destroy();
  }

  activeteWeapon(isActive) {
    this.setActive(isActive);
    this.setVisible(isActive);
  }
}

export default MeleeCollides;

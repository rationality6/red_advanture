class MeleeCollides extends Phaser.Physics.Arcade.Sprite {
  damege: number = 15;

  constructor(scene, x, y) {
    super(scene, x, y);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.x += 20;
    this.displayHeight = 50;
    this.displayWidth = 50;
    this.swing();
  }

  async swing() {
    // this.body?.reset(wielder.x, wielder.y);

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

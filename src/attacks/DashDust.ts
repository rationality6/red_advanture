class DashDust extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, lastDirection) {
    super(scene, x, y, "dashDust");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.effectName = "dashDust";
    this.lastDirection = lastDirection;

    this.init();
  }

  init() {
    this.setScale(0.5);
    if (this.lastDirection === Phaser.Physics.Arcade.FACING_RIGHT) {
      this.setFlipX(false);
      this.x -= 25;
    } else {
      this.setFlipX(true);
      this.x += 25;
    }
    this.y += 15;

    this.scene.middleOfDashAnimation = true;
    this.play("dashDust");

    this.on(
      "animationcomplete",
      (animation) => {
        if (animation.key === this.effectName) {
          this.scene.middleOfDashAnimation = false;
          this.destroy();
        }
      },
      this
    );
  }
}

export default DashDust;

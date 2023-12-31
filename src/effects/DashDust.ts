class DashDust extends Phaser.Physics.Arcade.Sprite {
  lastDirection: number;
  effectName: string;

  constructor(scene, x, y) {
    super(scene, x, y, "dashDust");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.effectName = "dashDust";

    this.setScale(1.5);
  }

  init(lastDirection, x, y) {
    this.lastDirection = lastDirection;

    this.x = x;
    this.y = y;

    this.activateProjectile(true);
    this.play("dashDust", true);

    if (this.lastDirection === Phaser.Physics.Arcade.FACING_RIGHT) {
      this.setFlipX(false);
      this.x -= 25;
    } else {
      this.setFlipX(true);
      this.x += 25;
    }
    this.y -= 11;

    this.on(
      "animationcomplete",
      (animation) => {
        if (animation.key === this.effectName) {
          this.activateProjectile(false);
        }
      },
      this
    );
  }

  activateProjectile(isActive) {
    this.setActive(isActive);
    this.setVisible(isActive);
  }
}

export default DashDust;

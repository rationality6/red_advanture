class Projectile extends Phaser.Physics.Arcade.Sprite {
  private speed: number = 300;
  private maxDistance = 200;
  private traveledDistance = 0;

  constructor(scene, x, y, key) {
    super(scene, x, y, key);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    let fireball = this.scene.anims.create({
      key: "fireball",
      frames: this.scene.anims.generateFrameNumbers("fireball", {
        start: 0,
        end: 2,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.play("fireball");
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    this.traveledDistance += this.body?.deltaAbsX();

    if (this.traveledDistance > this.maxDistance) {
      this.setActive(false);
      this.setVisible(false);
      this.traveledDistance = 0;
    }
  }

  fire(x, y) {
    this.setActive(true);
    this.setVisible(true);
    this.body?.reset(x, y);
    this.setVelocityX(this.speed);
  }
}

export default Projectile;

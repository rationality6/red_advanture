class Projectile extends Phaser.Physics.Arcade.Sprite {
  private speed: number = 300;
  private maxDistance = 300;
  private traveledDistance = 0;
  private cooldown = 2000;

  damage: number = 95;

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

    this.setSize(10, 10);

    this.play("fireball");
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    this.traveledDistance += this.body?.deltaAbsX();

    if (this.isOutOfRange()) {
      this.body?.reset(-50, -50);
      this.activateProjectile(false);
      this.traveledDistance = 0;
    }
  }

  fire(x, y) {
    this.activateProjectile(true);
    this.body?.reset(x, y);
    this.setVelocityX(this.speed);
  }

  deliversHit(target) {
    this.activateProjectile(false);
    this.traveledDistance = 0;
  }

  activateProjectile(isActive) {
    this.setActive(isActive);
    this.setVisible(isActive);
  }

  isOutOfRange() {
    return this.traveledDistance >= this.maxDistance && this.traveledDistance;
  }
}

export default Projectile;

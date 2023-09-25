class HitProjectile extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "hitParticle");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.effectName = "hitParticle";

    this.play("hitParticle");
    this.setScale(2);

    this.on(
      "animationcomplete",
      (animation) => {
        if (animation.key === this.effectName) {
          this.destroy();
        }
      },
      this
    );
  } 

}

export default HitProjectile;

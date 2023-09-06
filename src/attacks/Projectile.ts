class Projectile extends Phaser.Physics.Arcade.Sprite {
  private speed: number = 300;

  constructor(scene, x, y, key) {
    super(scene, x, y, key);

    scene.add.existing(this);
    scene.physics.add.existing(this);
  }

  fire(){
    console.log('fire')
    this.setVelocityX(this.speed);
  }
}

export default Projectile;

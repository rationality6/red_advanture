import initAnims from "./anims/envAnims";

class Coin extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "coin");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    initAnims(this.scene.anims);

    this.setDisplaySize(15,15)
    
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);

    this.play("coin", true);

    const randomVelocityX = Phaser.Math.Between(-200, 200)
    this.setVelocityX(randomVelocityX);
    this.setVelocityY(-200)
    this.setGravityY(500);

    this.setCollideWorldBounds(true);
  }
}

export default Coin
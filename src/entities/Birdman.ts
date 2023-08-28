import collidable from "../mixins/collidable";

class Birdman extends Phaser.Physics.Arcade.Sprite {
  private gravity: number = 0;
  private speed!: number;
  
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "birdman");

    scene.add.existing(this);
    scene.physics.add.existing(this);


    Object.assign(this, collidable);

    this.init();
  }

  init(): void {
    this.gravity = 500;
    this.speed = 150;

    // this.body.setGravityY(this.gravity);
  }
}

export default Birdman;

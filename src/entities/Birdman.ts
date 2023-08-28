import collidable from "../mixins/collidable";

class Birdman extends Phaser.Physics.Arcade.Sprite {
  private gravity: number = 0;
  
  constructor(scene, x, y) {
    super(scene, x, y, "birdman");

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

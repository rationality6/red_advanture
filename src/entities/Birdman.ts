import Enemy from "./Enemy";

class Birdman extends Enemy {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "birdman");
  }

  shootProjectile() {

  }
}

export default Birdman;
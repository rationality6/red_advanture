import Enemy from "./Enemy";

class Birdman extends Enemy {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "birdman");
  }

  update(time, delta){
    super.update(time, delta);
    this.play("birdman-idle", true);
  }
}

export default Birdman;
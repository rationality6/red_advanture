import Enemy from "./Enemy";
import initAnims from "./anims/enemyAnims";

class Birdman extends Enemy {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "birdman");
    initAnims(this.scene.anims);
  }

  update(time, delta){
    super.update(time, delta);
    this.play("birdman-idle", true);
  }
}

export default Birdman;

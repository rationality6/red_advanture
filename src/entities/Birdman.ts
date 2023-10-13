import Enemy from "./Enemy";
import initAnims from "./anims/birdmanAnims";

class Birdman extends Enemy {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "birdman");

    initAnims(this.scene.anims);
    this.init();
  }

  init() {
    super.init();

    this.setSize(10, 35);
    this.setOffset(11, 30);
  }

  update(time, delta) {
    super.update(time, delta);

    if (!this.active) {
      return;
    }

    if (this.isPlayingAnims("birdman-hurt")) {
      return;
    }

    this.play("birdman-idle", true);
  }

  takesHit(source) {
    super.takesHit(source);
    this.play("birdman-hurt", true);
  }
}

export default Birdman;

import Enemy from "./Enemy";

class Birdman extends Enemy {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "birdman");
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

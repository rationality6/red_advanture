import Enemy from "./Enemy";
import initAnims from "./anims/snakyAnims";

class Snaky extends Enemy {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "snaky");

    this.health = 500;
    this.speed = 10;

    initAnims(this.scene.anims);
  }

  update(time, delta) {
    super.update(time, delta);

    if (!this.active) {
      return;
    }

    if (this.isPlayingAnims("snaky-hurt")) {
      return;
    }

    this.play("snaky-idle", true);
  }

  takesHit(source) {
    super.takesHit(source);
    this.play("snaky-hurt", true);
  }
}

export default Snaky;

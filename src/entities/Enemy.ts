import collidable from "../mixins/collidable";

class Enemy extends Phaser.Physics.Arcade.Sprite {
  private gravity: number = 0;
  private speed!: number;
  private health!: number;

  constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
    super(scene, x, y, key);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    Object.assign(this, collidable);

    this.init();
  }

  init(): void {
    this.gravity = 500;
    this.speed = 150;
    this.health = 100;

    this.body.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);
    this.setImmovable(true);

    this.setSize(25, 45);
    this.setOffset(5, 20);
  }
}

export default Enemy;

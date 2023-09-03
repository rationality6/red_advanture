import collidable from "../mixins/collidable";

class Enemy extends Phaser.Physics.Arcade.Sprite {
  private gravity: number = 0;
  private speed!: number;
  private health!: number;
  private platformCollidersLayer;

  constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
    super(scene, x, y, key);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    Object.assign(this, collidable);

    this.init();
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  init(): void {
    this.gravity = 500;
    this.speed = 20;
    this.health = 100;
    this.rayGraphics = this.scene.add.graphics({
      lineStyle: {
        width: 2,
        color: 0xaa00aa,
      },
    });

    this.body.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);
    this.setImmovable(true);

    this.setSize(25, 45);
    this.setOffset(5, 20);
  }

  update(time, delta) {
    this.setVelocityX(this.speed);
    const { ray, hasHit } = this.raycast(
      this.body,
      this.platformCollidersLayer,
      30,
      5
    );

    if (hasHit) {

    }

    this.rayGraphics.clear();
    this.rayGraphics.strokeLineShape(ray);
  }

  setPlatformColliders(platformCollidersLayer) {
    this.platformCollidersLayer = platformCollidersLayer;
  }
}

export default Enemy;

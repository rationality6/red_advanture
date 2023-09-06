import collidable from "../mixins/collidable";

class Enemy extends Phaser.Physics.Arcade.Sprite {
  private gravity: number = 0;
  private speed!: number;
  private health!: number;
  private platformCollidersLayer;
  private timeFromLastTurn: number;

  private player!: Phaser.Physics.Arcade.Sprite;

  constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
    super(scene, x, y, key);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    Object.assign(this, collidable);

    this.config = scene.config

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
        color: 0x0000ff,
      },
    });

    this.timeFromLastTurn = 0;

    this.body.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);
    this.setImmovable(true);

    this.setSize(25, 45);
    this.setOffset(5, 20);
    this.setVelocityX(this.speed);

    this.frontRayGraphics = this.scene.add.graphics({
      lineStyle: {
        width: 2,
        color: 0xd0312d,
      },
    });
  }

  update(time, delta) {
    const { ray, hasHit } = this.raycast(
      this.body,
      this.platformCollidersLayer,
      40,
      1
    );

    if (!hasHit && this.timeFromLastTurn + 1000 < time) {
      this.setFlipX(!this.flipX);
      this.setVelocityX((this.speed = -this.speed));
      this.timeFromLastTurn = time;
    }

    if(this.config.debug && ray){
      this.rayGraphics.clear();
      this.rayGraphics.strokeLineShape(ray);
    }

    this.frontRaycast(this.player, this.body);
  }

  setPlatformColliders(platformCollidersLayer) {
    this.platformCollidersLayer = platformCollidersLayer;
  }
  setPlayer(player) {
    this.player = player;
  }
}

export default Enemy;

import collidable from "../mixins/collidable";

import DamageNumberParticle from "../effects/DamageNumberParticle";

import Coin from "./Coin";

import anims from "../mixins/anims";

class Enemy extends Phaser.Physics.Arcade.Sprite {
  private gravity: number = 0;
  private speed!: number;
  private health!: number;
  private platformCollidersLayer;
  private timeFromLastTurn: number;

  lastDirection: number = Phaser.Physics.Arcade.FACING_RIGHT;

  hasBeenHit: boolean = false;

  private player!: Phaser.Physics.Arcade.Sprite;

  constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
    super(scene, x, y, key);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    Object.assign(this, collidable);
    Object.assign(this, anims);

    this.config = scene.config;

    this.init();
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  init(): void {
    this.gravity = 500;
    this.speed = 20;
    this.health = 200;
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
    this.setVelocityX(this.speed);

    this.frontRayGraphics = this.scene.add.graphics({
      lineStyle: {
        width: 2,
        color: 0xd0312d,
      },
    });
  }

  update(time, delta) {
    if (this.hasBeenHit) {
      return;
    }

    if (this.getBounds().bottom > this.scene.physics.world.bounds.bottom) {
      this.scene.events.removeListener(
        Phaser.Scenes.Events.UPDATE,
        this.update,
        this
      );
      this.setActive(false);
      this.rayGraphics.clear();
      this.frontRayGraphics.clear();
      this.destroy();
      return;
    }

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

    if (this.config.debug && ray) {
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

  takesHit(source) {
    this.hasBeenHit = true;
    this.setBounce(0.7, 0.7)

    const damageChoosed = Phaser.Math.Between(
      source.damageBetween[0],
      source.damageBetween[1]
    );

    new DamageNumberParticle(this.scene, this.x, this.y, damageChoosed);
    this.health -= damageChoosed;

    source.deliversHit(this);
    source.body.reset(-50, -50);

    this.checkDeath();

    this.scene.coins.createCoins(1, this);

    setTimeout(() => {
      this.setBounce(0, 0)
      this.hasBeenHit = false;
    }, 1000);
  }

  checkDeath() {
    if (this.health <= 0) {
      this.setVelocity(0, -200);
      this.setTint(0xff0000);
      this.body.checkCollision.none = true;
      this.setCollideWorldBounds(false);

      this.scene.coins.createCoins(5, this);
    }
  }
}

export default Enemy;

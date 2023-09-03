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
      this.platformCollidersLayer
    );

    if (hasHit) {
      console.log("hit");
    }

    this.rayGraphics.clear();
    this.rayGraphics.strokeLineShape(ray);
  }

  raycast(body, layer, raylength = 30) {
    const { x, y, width, halfHeight } = body;
    const line = new Phaser.Geom.Line();

    let hasHit = false;

    line.x1 = x + width;
    line.y1 = y + halfHeight;
    line.x2 = line.x1 + raylength;
    line.y2 = line.y1 + raylength;

    const hits = layer.getTilesWithinShape(line);

    if (hits.length > 0) {
      hasHit = hits.some((hit) => hit.index !== -1);
    }

    return { ray: line, hasHit };
  }

  setPlatformColliders(platformCollidersLayer) {
    this.platformCollidersLayer = platformCollidersLayer;
  }
}

export default Enemy;

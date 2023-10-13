import Phaser from "phaser";

import Enemies from "../groups/Enemies";

import cameraMixin from "../mixins/cameraMixin";
import minimapMixin from "../mixins/minimapMixin";

import HitProjectile from "../attacks/HitProjectile";

import GameGeneral from "./GameGeneral";

class GreenScene extends GameGeneral {
  colliderLayer: any;

  background: Phaser.GameObjects.TileSprite;

  constructor(config) {
    super("GreenScene");

    this.config = config;

    Object.assign(this, cameraMixin);
    Object.assign(this, minimapMixin);
  }

  create() {
    super.create();

    this.catGroup.createCat(370, 400);
    this.catGroup.createCat(400, 400);
    this.catGroup.createCat(430, 400);

    this.map = this.make.tilemap({ key: "map-green" });
    const tileset1 = this.map.addTilesetImage("green", "green-tile");

    this.colliderLayer = this.map.createLayer(
      "collidersLayer",
      tileset1!,
      0,
      0
    );

    this.mapFieldLayer = this.map.createLayer("field", tileset1!, 0, 0);

    const zones = this.getPlayerZones();

    this.createEndOfLevel(zones.end);

    this.background = this.add
      .tileSprite(0, 0, this.gameHeight, this.gameWidth - 10, "sky")
      .setDepth(-1)
      .setScale(4);

    this.colliderLayer.setCollisionByProperty({ collides: true });

    this.player.addCollider(this.colliderLayer);

    this.setupHalfFollowupCameraOn(this.player);
    this.setMiniMap();
  }

  onWeaponHit(entity, source) {
    new HitProjectile(this.scene, source.x, source.y);
    entity.takesHit(source);
  }

  finishDrawing(pointer, layer) {
    this.line.x2 = pointer.worldX;
    this.line.y2 = pointer.worldY;

    this.graphics.clear();
    this.graphics.strokeLineShape(this.line);

    this.tileHits = layer.getTilesWithinShape(this.line);

    if (this.tileHits.length > 0) {
      this.tileHits.forEach((tile) => {
        if (tile.index !== -1) {
          tile.setCollision(true);
        }
      });
    }
  }

  createEnemySpawns(spawnLayer) {
    const enemies = new Enemies(this);
    const enemyTypes = enemies.getTypes();

    spawnLayer.objects.forEach((spawnPoint) => {
      const enemy = new enemyTypes[spawnPoint.type](
        this,
        spawnPoint.x,
        spawnPoint.y
      );
      enemy.setPlatformColliders(this.colliderLayer);
      enemy.setPlayer(this.player);
      enemies.add(enemy);
    });

    return enemies;
  }

  update(time: number, delta: number): void {
    this.background.tilePositionX -= 0.1;
  }
}

export default GreenScene;

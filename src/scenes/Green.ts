import Phaser from "phaser";
import PhaserSceneTool from "./PhaserSceneTool";

import Player from "../entities/Player";
import BirdMan from "../entities/BirdMan";
import CatLaying from "../entities/CatLaying";

import Enemies from "../groups/Enemies";
import Cats from "../groups/Cats";
import Coins from "../groups/Coins";

import cameraMixin from "../mixins/cameraMixin";
import minimapMixin from "../mixins/minimapMixin";

import HitProjectile from "../attacks/HitProjectile";

import PlasmaPost2FX from "../pipeline/PlasmaPost2FX";

class GreenScene extends PhaserSceneTool {
  colliderLayer: any;
  private bgStarted = false;
  player: Player;

  background: Phaser.GameObjects.TileSprite;
  coins: Coins;

  constructor(config) {
    super("GreenScene");
    this.config = config;
    Object.assign(this, cameraMixin);
    Object.assign(this, minimapMixin);
  }

  create() {
    const map = this.make.tilemap({ key: "map-green" });
    const tileset1 = map.addTilesetImage("green", "green-tile");

    this.colliderLayer = map.createLayer("collidersLayer", tileset1!, 0, 0);
    const mapFieldLayer = map.createLayer("field", tileset1!, 0, 0);

    this.background = this.add
      .tileSprite(0, 0, this.gameHeight, this.gameWidth - 10, "sky")
      .setDepth(-1)
      .setScale(4);

    const zones = this.getPlayerZones(map);
    // const enemySpawns = map.getObjectLayer("enemys");

    this.player = new Player(this, zones.start.x, zones.start.y, "lafull-idle");
    this.createEndOfLevel(this.player, zones.end);

    this.colliderLayer.setCollisionByProperty({ collides: true });

    this.player.addCollider(this.colliderLayer);

    this.setupHalfFollowupCameraOn(this.player);
    this.setMiniMap();

    this.createCatSpawns(map.getObjectLayer("cats"));

    // const enemiesGroup = this.createEnemySpawns(enemySpawns);
    // enemiesGroup.addCollider(this.colliderLayer);
    // enemiesGroup.addCollider(this.player, this.onPlayerCollision);
    // enemiesGroup.addCollider(this.player.projectiles, this.onWeaponHit);

    // enemiesGroup.addOverlap(this.player.meleeCollides, this.onWeaponHit);

    this.coins = new Coins(this);
  }

  onWeaponHit(entity, source) {
    new HitProjectile(this.scene, source.x, source.y);
    entity.takesHit(source);
  }

  onPlayerCollision(enemy: BirdMan, player: Player) {
    player.takesHit();
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

  createCatSpawns() {
    const catGroup = new Cats(this);

    const cat1 = new CatLaying(this, 270, 400);
    catGroup.add(cat1);

    const cat2 = new CatLaying(this, 300, 400);
    catGroup.add(cat2);

    catGroup.addCollider(this.player, () => {
      this.sound.play("meow");
    });
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

  getPlayerZones(map: any) {
    const playerZones = map.getObjectLayer("zones").objects;
    return {
      start: playerZones.find((zone) => zone.name === "startZone"),
      end: playerZones.find((zone) => zone.name === "endZone"),
    };
  }

  createEndOfLevel(player, end) {
    const endOfSprite = this.physics.add
      .sprite(end.x, end.y, "end")
      .setSize(5, 200);

    this.physics.add.overlap(player, endOfSprite, () => {
      this.scene.start("GameScene");
    });
  }

  update(time: number, delta: number): void {
    this.background.tilePositionX -= 0.1;
  }
}

export default GreenScene;

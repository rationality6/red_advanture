import Phaser from "phaser";

import Player from "../entities/Player";
import BirdMan from "../entities/BirdMan";

import Enemies from "../groups/Enemies";

import cameraMixin from "../mixins/cameraMixin";
import minimapMixin from "../mixins/minimapMixin";

import HitProjectile from "../attacks/HitProjectile";

import GameGeneral from "./GameGeneral";

class GameScene extends GameGeneral {
  colliderLayer: any;
  private bgStarted = false;

  background: Phaser.GameObjects.TileSprite;

  constructor(config) {
    super("GameScene");

    this.config = config;

    Object.assign(this, cameraMixin);
    Object.assign(this, minimapMixin);
  }

  playSong() {
    if (this.bgStarted === false) {
      this.bgStarted = true;
      this.sound.play("silorMoon", {
        loop: -1,
        volume: 0.1,
      });
    }
  }

  create() {
    super.create()

    const spaceBar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    spaceBar.on("down", () => {
      this.playSong();
    });

    this.map = this.make.tilemap({ key: "map" });
    const tileset1 = this.map.addTilesetImage("main_lev_build_1", "tiles-1");
    const tileset2 = this.map.addTilesetImage("hee_tree", "hee_tree");

    this.colliderLayer = this.map.createLayer("collidersLayer", tileset1!, 0, 0);
    this.map.createLayer("moss", tileset1!, 0, 0);
    const mapFieldLayer = this.map.createLayer("field", tileset1!, 0, 0);
    this.map.createLayer("trees", tileset1!, 0, 0);
    this.map.createLayer("leafs", tileset1!, 0, 0);

    this.background = this.add
      .tileSprite(0, 0, this.gameHeight, this.gameWidth - 10, "sky")
      .setDepth(-1)
      .setScale(4);

    this.add.image(150, 298, "hee_tree").setOrigin(0, 0);
    this.add.image(70, 296, "hee_tree").setOrigin(0, 0);

    const zones = this.getPlayerZones(this.map);

    this.player.x = zones.start.x;
    this.player.y = zones.start.y;

    const enemySpawns = this.map.getObjectLayer("enemys");

    this.createEndOfLevel(this.player, zones.end);

    this.colliderLayer.setCollisionByProperty({ collides: true });

    this.player.addCollider(this.colliderLayer);

    this.setupFollowupCameraOn(this.player);
    this.setMiniMap();

    const enemiesGroup = this.createEnemySpawns(enemySpawns);
    enemiesGroup.addCollider(this.colliderLayer);
    
    enemiesGroup.addCollider(this.player, this.onPlayerCollision);

    enemiesGroup.addCollider(this.player.projectiles, this.onWeaponHit);

    enemiesGroup.addOverlap(this.player.meleeCollides, this.onWeaponHit);
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
      this.scene.start("EndScene");
    });
  }

  update(time: number, delta: number): void {
    this.background.tilePositionX -= 0.1;
  }
}

export default GameScene;

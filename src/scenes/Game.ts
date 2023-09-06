import Phaser from "phaser";
import PhaserSceneTool from "./PhaserSceneTool";

import Player from "../entities/Player";
import BirdMan from "../entities/BirdMan";
import CatLaying from "../entities/CatLaying";

import Enemies from "../groups/Enemies";
import Cats from "../groups/Cats";

import cameraMixin from "../mixins/cameraMixin";

export default class GameScene extends PhaserSceneTool {
  colliderLayer: any;
  private bgStarted = false;
  player: Player;

  constructor(config) {
    super("GameScene");
    this.config = config
    Object.assign(this, cameraMixin);
  }

  playSong() {
    if (this.bgStarted === false) {
      this.bgStarted = true;
      this.sound.play("bgSoundSuperShy", {
        loop: -1,
        volume: 0.1,
      });
    }
  }

  create() {
    const spaceBar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    spaceBar.on("down", () => {
      this.playSong();
    });

    const map = this.make.tilemap({ key: "map" });
    const tileset1 = map.addTilesetImage("main_lev_build_1", "tiles-1");

    this.colliderLayer = map.createLayer("collidersLayer", tileset1!, 0, 0);
    map.createLayer("moss", tileset1!, 0, 0);
    const mapFieldLayer = map.createLayer("field", tileset1!, 0, 0);
    map.createLayer("trees", tileset1!, 0, 0);
    map.createLayer("leafs", tileset1!, 0, 0);

    const zones = this.getPlayerZones(map);
    const enemySpawns = map.getObjectLayer("enemys");

    this.player = new Player(this, zones.start.x, zones.start.y, "player");
    this.createEndOfLevel(this.player, zones.end);

    this.colliderLayer.setCollisionByProperty({ collides: true });

    this.player.addCollider(this.colliderLayer);

    this.setupFollowupCameraOn(this.player);

    this.anims.create({
      key: "catLaying",
      frames: this.anims.generateFrameNumbers("catLaying", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.createCatSpawns(map.getObjectLayer("cats"));

    const enemiesGroup = this.createEnemySpawns(enemySpawns);
    enemiesGroup.addCollider(this.player, this.onPlayerCollision);
    enemiesGroup.addCollider(this.colliderLayer);
  }

  onPlayerCollision(enemy: BirdMan, player: Player){
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

  createCatSpawns(catSpawns) {
    const catGroup = new Cats(this);
    const cat1 = new CatLaying(this, 270, 365);
    catGroup.add(cat1);
    const cat2 = new CatLaying(this, 50, 90);
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
      enemy.setPlayer(this.player)
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

  update(time: number, delta: number): void {}
}

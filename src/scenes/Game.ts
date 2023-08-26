import Phaser from "phaser";
import Player from "../entities/Player";

export default class GameScene extends Phaser.Scene {
  colliderLayer: any;
  private bgStarted = false;

  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.image("logo", "assets/phaser3-logo.png");

    this.load.tilemapTiledJSON("map", "assets/json_exporta.tmj");
    this.load.tilemapTiledJSON("map2", "assets/level2.tmj");

    this.load.image("tiles-1", "assets/main_lev_build_1.png");
    this.load.image("tiles-2", "assets/main_lev_build_2.png");

    this.load.spritesheet("catLaying", "assets/cat_laying.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("player", "assets/player/move_sprite_1.png", {
      frameWidth: 32,
      frameHeight: 32,
      spacing: 32,
    });
  }

  playSong() {
    if (this.bgStarted === false) {
      this.bgStarted = true;
      let bgSound = new Audio("./assets/sounds/super_shy.mp3");
      bgSound.loop = true;
      bgSound.play();
    }
  }

  create() {
    const spaceBar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    spaceBar.on("down", () => {
      this.playSong()
    });

    const map = this.make.tilemap({ key: "map" });
    const tileset1 = map.addTilesetImage("main_lev_build_1", "tiles-1");
    // const tileset2 = map.addTilesetImage("main_lev_build_2", "tiles-2");

    this.colliderLayer = map.createLayer("collidersLayer", tileset1!, 0, 0);
    map.createLayer("moss", tileset1!, 0, 0);
    const mapFieldLayer = map.createLayer("field", tileset1!, 0, 0);
    map.createLayer("trees", tileset1!, 0, 0);
    map.createLayer("leafs", tileset1!, 0, 0);

    const zones = this.getPlayerZones(map);

    // const player = new Player(this, zones.start.x, zones.start.y, "player");
    const player = new Player(this, zones.start.x, zones.start.y, "player");
    this.createEndOfLevel(player, zones.end);

    this.colliderLayer.setCollisionByProperty({ collides: true });

    player.addCollider(this.colliderLayer);

    this.setupFollowupCameraOn(player);

    this.anims.create({
      key: "catLaying",
      frames: this.anims.generateFrameNumbers("catLaying", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.add.sprite(250, 356, "catLaying").setScale(1).play("catLaying");
  }

  setupFollowupCameraOn(player) {
    this.cameras.main.setBounds(0, 0, 1200, 600).setZoom(2);
    this.cameras.main.startFollow(player);
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
}

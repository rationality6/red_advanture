import Phaser from "phaser";
import Player from "../entities/Player";

export default class GameScene extends Phaser.Scene {
  colliderLayer: any;

  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.image("logo", "assets/phaser3-logo.png");

    this.load.tilemapTiledJSON("map", "assets/json_exporta.tmj");
    this.load.image("tiles-1", "assets/main_lev_build_1.png");
    // this.load.image('tiles-2', 'assets/main_lev_build_2.png');

    this.load.image("playerIdle", "assets/player/movements/idle01.png");
  }

  create() {
    const map = this.make.tilemap({ key: "map" });
    const tileset1 = map.addTilesetImage("main_lev_build_1", "tiles-1");
    // const tileset2 = map.addTilesetImage('main_lev_build_2', 'tiles-2');

    this.colliderLayer = map.createLayer("collidersLayer", tileset1!, 0, 0);
    map.createLayer("moss", tileset1!, 0, 0);
    const mapFieldLayer = map.createLayer("field", tileset1!, 0, 0);
    map.createLayer("trees", tileset1!, 0, 0);
    map.createLayer("leafs", tileset1!, 0, 0);

    const player = new Player(this, 100, 250, "player")

    this.colliderLayer.setCollisionByProperty({ collides: true });

    this.physics.add.collider(player, this.colliderLayer);
  }
}

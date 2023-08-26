import Phaser from "phaser";
import Player from "../entities/player";

export default class EndScene extends Phaser.Scene {
  private colliderLayer: any;

  constructor() {
    super("EndScene");
  }

  create() {
    const map = this.make.tilemap({ key: "map2" });
    // const tileset1 = map.addTilesetImage("tile_set", "tiles-1");
    const tileset2 = map.addTilesetImage("tile_set", "tiles-2");

    map.createLayer("fieldLayer", tileset2!, 0, 0);
    this.colliderLayer = map.createLayer("colliderLayer", tileset2, 0, 0);

    this.colliderLayer.setCollisionByProperty({ collides: true });

    const player = new Player(this, 100, 100, "player");

    player.addCollider(this.colliderLayer);
  }
}

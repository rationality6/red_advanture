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

    this.colliderLayer = map.createLayer("colliderLayer", tileset2, 0, 0);
    map.createLayer("fieldLayer", tileset2!, 0, 0);

    this.colliderLayer.setCollisionByProperty({ collides: true });

    const player = new Player(this, 100, 100, "player");
    player.addCollider(this.colliderLayer);

    const back = this.getPlayerZones(map).back;

    this.createEndOfLevel(player, back)

    this.setupFollowupCameraOn(player)
  }

  setupFollowupCameraOn(player) {
    this.cameras.main.setBounds(0, 0, 1200, 600).setZoom(2);
    this.cameras.main.startFollow(player);
  }

  getPlayerZones(map: any) {
    const playerZones = map.getObjectLayer("zones").objects;
    return {
      back: playerZones.find((zone) => zone.name === "backZone"),
    };
  }

  createEndOfLevel(player, end) {
    const endOfSprite = this.physics.add
      .sprite(end.x, end.y, "end")
      .setSize(5, 200);

    this.physics.add.overlap(player, endOfSprite, () => {
      console.log("end");
      this.add.image(400, 300, "logo");
    });
  }
}

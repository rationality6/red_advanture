import Phaser from "phaser";
import PhaserSceneTool from "./PhaserSceneTool";

import Player from "../entities/player";

import CatLaying from "../entities/CatLaying";
import Cats from "../groups/Cats";

import cameraMixin from "../mixins/cameraMixin";

export default class EndScene extends PhaserSceneTool {
  private colliderLayer: any;

  constructor() {
    super("EndScene");

    Object.assign(this, cameraMixin);
  }

  create() {
    const map = this.make.tilemap({ key: "map2" });
    // const tileset1 = map.addTilesetImage("tile_set", "tiles-1");
    const tileset2 = map.addTilesetImage("tile_set", "tiles-2");

    this.colliderLayer = map.createLayer("colliderLayer", tileset2, 0, 0);
    map.createLayer("fieldLayer", tileset2!, 0, 0);

    this.colliderLayer.setCollisionByProperty({ collides: true });

    this.player = new Player(this, 100, 100, "player");
    this.player.addCollider(this.colliderLayer);

    const back = this.getPlayerZones(map).back;

    this.createEndOfLevel(this.player, back)

    this.setupFollowupCameraOn(this.player)

    const catGroup = new Cats(this);
    const cat1 = new CatLaying(this, 270, 365);
    catGroup.add(cat1);
    const cat2 = new CatLaying(this, 50, 90);
    catGroup.add(cat2);
    catGroup.addCollider(this.player, () => {
      this.sound.play("meow");
    });
    
  }

  setupFollowupCameraOn(player) {
    this.cameras.main.setBounds(0, 0, 1200, 600).setZoom(1.8);
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
      this.add.image(400, 300, "interpretLogoWithCat");
    });
  }
}

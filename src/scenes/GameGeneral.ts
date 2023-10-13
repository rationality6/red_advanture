import PhaserSceneTool from "./PhaserSceneTool";

import Player from "../entities/Player";

import Coins from "../groups/Coins";
import Cats from "../groups/Cats";

class GameGeneral extends PhaserSceneTool {
  // entities
  player: Player;

  // groups
  coins: Coins;
  catGroup: Cats;

  constructor(key: string) {
    super(key);
  }

  create() {
    this.createPlayer(100, 400)
    this.createCoinsSpawns();
    this.createCatSpawns();
  }

  createPlayer(x, y) {
    this.player = new Player(this, x, y, "lafull-idle");
  }

  createCoinsSpawns() {
    this.coins = new Coins(this);
    this.coins.addCollider(this.colliderLayer);
    this.coins.addCollider(this.player, this.getCoin);
  }

  getCoin(coin: any, player: any) {
    this.scene.sound.play("coinGet", { volume: 1 });
    coin.destroy();
  }

  createCatSpawns() {
    this.catGroup = new Cats(this);

    this.catGroup.createCat(270, 400);
    this.catGroup.createCat(300, 400);

    this.catGroup.addCollider(this.player, (cat) => {
      this.sound.play("meow");
      this.coins.createCoins(10, cat);
    });
  }

  getPlayerZones() {
    const playerZones = this.map.getObjectLayer("zones").objects;
    return {
      start: playerZones.find((zone) => zone.name === "startZone"),
      end: playerZones.find((zone) => zone.name === "endZone"),
    };
  }

  createEndOfLevel(end) {
    const endOfSprite = this.physics.add
      .sprite(end.x, end.y, "end")
      .setSize(5, 200);

    this.physics.add.overlap(this.player, endOfSprite, () => {
      this.scene.start("GameScene");
    });
  }
}

export default GameGeneral;

import PhaserSceneTool from "./PhaserSceneTool";

import Coins from "../groups/Coins";
import Cats from "../groups/Cats";

import initAnimations from "../entities/anims/playerAnims";
import initLafullAnimations from "../entities/anims/lafullAnims";

import playerMixin from "../mixins/playerMixin";

class GameGeneral extends PhaserSceneTool {
  // groups
  coins: Coins;
  catGroup: Cats;

  constructor(key: string) {
    super(key);
  }

  create() {
    Object.assign(this, playerMixin);

    this.setInitAnims();
    this.createPlayer(100, 400);
    this.createCoinsSpawns();
    this.createCatSpawns();
  }

  createCoinsSpawns() {
    this.coins = new Coins(this);
    this.coins.addCollider(this.colliderLayer);
    this.coins.addCollider(this.player, this.getCoin);
  }

  getCoin(coin: any, player) {
    this.scene.sound.play("coinGet", { volume: 0.5 });
    player.coinGet += 1;
    coin.destroy();
  }

  createCatSpawns() {
    this.catGroup = new Cats(this);

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

  setInitAnims() {
    initAnimations(this.anims);
    initLafullAnimations(this.anims);
  }

  updateCoinText() {
    this.scoreText.x = this.player.body.position.x;
    this.scoreText.y = this.player.body.position.y;
    this.scoreText.setText(`${this.player.coinGet}`);
  }

  drawCoin() {
    this.scoreText = this.add.text(16, 16, `${this.player.coinGet}`, {
      fontSize: "32px",
      fill: "#fff",
    });
  }
}

export default GameGeneral;

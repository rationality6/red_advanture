import collidable from "../mixins/collidable";
import Coin from "../entities/Coin";

class Coins extends Phaser.GameObjects.Group {
  constructor(scene: Phaser.Scene) {
    super(scene);

    Object.assign(this, collidable);
  }

  createCoins(coinTotal): void {
    [...Array(coinTotal)].forEach(() => {
      this.add(this.createCoin());
    });
  }

  createCoin(): Coin {
    return new Coin(
      this.scene,
      this.scene.player.x,
      this.scene.player.y,
      "coin"
    );
  }
}

export default Coins;

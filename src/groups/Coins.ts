import collidable from "../mixins/collidable";
import Coin from "../entities/Coin";

class Coins extends Phaser.GameObjects.Group {
  constructor(scene: Phaser.Scene) {
    super(scene);

    Object.assign(this, collidable);
  }

  createCoins(coinTotal, target): void {
    [...Array(coinTotal)].forEach(() => {
      this.add(this.createCoin(target));
    });
  }

  createCoin(target): Coin {
    return new Coin(
      this.scene,
      target.x,
      target.y,
      "coin"
    );
  }
}

export default Coins;

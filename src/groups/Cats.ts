import collidable from "../mixins/collidable";

import CatLaying from "../entities/CatLaying";

class Cats extends Phaser.GameObjects.Group {
  constructor(scene: Phaser.Scene) {
    super(scene);

    Object.assign(this, collidable);
  }

  createCat(x, y) {
    const newCat = new CatLaying(this.scene, x, y);
    this.add(newCat);
  }
}

export default Cats;

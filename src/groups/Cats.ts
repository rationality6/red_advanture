import collidable from "../mixins/collidable";

import initAnims from "../entities/anims/catAnims";
import CatLaying from "../entities/CatLaying";

class Cats extends Phaser.GameObjects.Group {
  constructor(scene: Phaser.Scene) {
    super(scene);

    initAnims(this.scene.anims);

    Object.assign(this, collidable);
  }

  createCat(x, y) {
    const newCat = new CatLaying(this.scene, x, y);
    this.add(newCat);
  }
}

export default Cats;

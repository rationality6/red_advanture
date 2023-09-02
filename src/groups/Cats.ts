import collidable from "../mixins/collidable";

class Cats extends Phaser.GameObjects.Group {
  constructor(scene: Phaser.Scene) {
    super(scene);

    Object.assign(this, collidable);
  }
}

export default Cats;

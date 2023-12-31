import { ENEMY_TYPES } from "../types";
import collidable from "../mixins/collidable";

class Enemies extends Phaser.GameObjects.Group {
  constructor(scene: Phaser.Scene) {
    super(scene);

    Object.assign(this, collidable);
  }

  getTypes() {
    return ENEMY_TYPES;
  }
}

export default Enemies;

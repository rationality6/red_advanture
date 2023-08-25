import Phaser from "phaser";

export default class EndScene extends Phaser.Scene {
  constructor() {
    super("EndScene");
  }

  preload() {
    this.load.image("logo", "assets/phaser3-logo.png");
  }

  create() {
    this.add.image(400, 300, "logo");
  }
}

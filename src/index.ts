import Phaser from "phaser";
import config from "./config";
import GameScene from "./scenes/Game";
import EndScene from "./scenes/End";

new Phaser.Game(
  Object.assign(config, {
    scene: [
      GameScene,
      EndScene
    ],
  })
);

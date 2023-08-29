import Phaser from "phaser";
import config from "./config";

import PreloadLogo from "./scenes/PreloadLogo";
import Preload from "./scenes/Preload";
import GameScene from "./scenes/Game";
import EndScene from "./scenes/End";

new Phaser.Game(
  Object.assign(config, {
    scene: [
      PreloadLogo,
      Preload,
      GameScene,
      EndScene,
    ],
  })
);

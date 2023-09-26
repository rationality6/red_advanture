import Phaser from "phaser";
import config from "./config";

import PreloadLogo from "./scenes/PreloadLogo";
import Preload from "./scenes/Preload";
import OpeningScene from "./scenes/Opening";
import GameScene from "./scenes/Game";
import EndScene from "./scenes/End";

new Phaser.Game(
  Object.assign(config, {
    scene: [
      PreloadLogo,
      Preload,
      OpeningScene,
      new GameScene(config),
      EndScene,
    ],
  })
);

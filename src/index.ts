import Phaser from "phaser";
import config from "./config";

import PreloadLogo from "./scenes/PreloadLogo";
import Preload from "./scenes/Preload";
import OpeningScene from "./scenes/Opening";
import GreenScene from "./scenes/Green";
import GameScene from "./scenes/Game";
import EndScene from "./scenes/End";

new Phaser.Game(
  Object.assign(config, {
    scene: [
      PreloadLogo,
      new Preload(config),
      OpeningScene,
      new GreenScene(config),
      new GameScene(config),
      new EndScene(config),
    ],
  })
);

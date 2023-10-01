import Phaser from "phaser";
import WebFontLoaderPlugin from "phaser3-rex-plugins/plugins/webfontloader-plugin.js";

const SHARED_CONFIG = {
  debug: false,
};

export default {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  parent: "game",
  backgroundColor: "transparent",
  scale: {
    width: 1200,
    height: 600,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: SHARED_CONFIG.debug,
    },
  },

  plugins: {
    global: [
      {
        key: "rexWebFontLoader",
        plugin: WebFontLoaderPlugin,
        start: true,
      },
    ],
  },
};

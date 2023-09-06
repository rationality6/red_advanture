import Phaser from 'phaser';

const SHARED_CONFIG = {
  debug: true
}

export default {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  parent: 'game',
  backgroundColor: 'transparent',
  scale: {
    width: 1200,
    height: 600,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: SHARED_CONFIG.debug,
    },
  },
};

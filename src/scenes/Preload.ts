class Preload extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    this.load.on("progress", function (value) {
      console.log(value);
    });

    this.load.on("fileprogress", function (file) {
      console.log(file.src);
    });
    
    this.load.on("complete", function () {
      console.log("complete");
    });

    this.load.tilemapTiledJSON("map", "assets/json_exporta.tmj");
    this.load.tilemapTiledJSON("map2", "assets/level2.tmj");

    this.load.image("tiles-1", "assets/main_lev_build_1.png");
    this.load.image("tiles-2", "assets/main_lev_build_2.png");

    this.load.spritesheet("catLaying", "assets/cat_laying.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("player", "assets/player/move_sprite_1.png", {
      frameWidth: 32,
      frameHeight: 32,
      spacing: 32,
    });

    this.load.spritesheet("birdman", "assets/enemy/enemy_sheet.png", {
      frameWidth: 32,
      frameHeight: 64,
      spacing: 32,
    });
  }

  create() {
    this.scene.start("GameScene");

    
  }
}

export default Preload;

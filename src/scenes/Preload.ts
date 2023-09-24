import PhaserSceneTool from "./PhaserSceneTool";

class Preload extends PhaserSceneTool {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    this.loadLoadingScreen();

    this.load.tilemapTiledJSON("map", "assets/level1.tmj");
    this.load.tilemapTiledJSON("map2", "assets/level2.tmj");

    this.load.image("tiles-1", "assets/main_lev_build_1.png");
    this.load.image("tiles-2", "assets/main_lev_build_2.png");

    this.load.image("hee_tree", "assets/hee_tree.png");

    this.load.spritesheet("fireball", "assets/player/fire_ball.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("catLaying", "assets/cat_laying.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("player", "assets/player/move_sprite_1.png", {
      frameWidth: 32,
      frameHeight: 32,
      spacing: 32,
    });

    this.load.spritesheet("throw", "assets/player/throw_attack_sheet_1.png", {
      frameWidth: 38,
      frameHeight: 38,
    });
    
    this.load.spritesheet("hitParticle", "assets/effect/bubble_effect.png", {
      frameWidth: 50,
      frameHeight: 50,
    });

    this.load.spritesheet("lafull-idle", "assets/lafull/idle.png", {
      frameWidth: 162,
      frameHeight: 162,
    });

    this.load.spritesheet("lafull-run", "assets/lafull/run.png", {
      frameWidth: 162,
      frameHeight: 162,
    });

    this.load.spritesheet("lafull-jump", "assets/lafull/jump.png", {
      frameWidth: 162,
      frameHeight: 162,
    });

    this.load.spritesheet("lafull-attack1", "assets/lafull/attack1.png", {
      frameWidth: 162,
      frameHeight: 162,
    });

    this.load.spritesheet("lafull-attack2", "assets/lafull/attack2.png", {
      frameWidth: 162,
      frameHeight: 162,
    });

    this.load.spritesheet("lafull-attack3", "assets/lafull/attack3.png", {
      frameWidth: 162,
      frameHeight: 162,
    });

    this.load.spritesheet("birdman-idle", "assets/enemy/enemy_sheet.png", {
      frameWidth: 32,
      frameHeight: 64,
      spacing: 32,
    });

    this.load.audio("missed", "assets/sounds/missed.mp3");
    this.load.audio("ruruSpecialLaser", "assets/sounds/ruru_special_laser.mp3");
    this.load.audio("lightSaber", "assets/sounds/light_saber.mp3");
    this.load.audio("bgSoundSuperShy", "assets/sounds/super_shy.mp3");
    this.load.audio("jumpSound", "assets/sounds/jump.mp3");
    this.load.audio("meow", "assets/sounds/meow.mp3");
    this.load.audio("silorMoon", "assets/sounds/silor_moon.mp3");
  }

  loadLoadingScreen() {
    let progressBar = this.add.graphics();
    let progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);

    let width = this.cameras.main.width;
    let height = this.cameras.main.height;

    let loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: "Loading...",
      style: {
        font: "20px monospace",
        fill: "#ffffff",
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    let percentText = this.make.text({
      x: width / 2,
      y: height / 2,
      text: "0%",
      style: {
        font: "18px monospace",
        fill: "#ffffff",
      },
    });
    percentText.setOrigin(0.5, 0.5);

    let assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: "",
      style: {
        font: "18px monospace",
        fill: "#ffffff",
      },
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on("progress", (value) => {
      percentText.setText(parseInt(value * 100) + "%");
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 0.8);
      progressBar.fillRect(this.gameWidth / 2 - 160, 280, 300 * value, 30);
    });

    this.load.on("fileprogress", (file) => {
      assetText.setText("Loading asset: " + file.key);
    });

    this.load.on("complete", () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });
  }

  async create() {
    this.cameras.main.fadeIn(1000, 255, 255, 255);

    const logo = this.add.image(
      this.gameWidth / 2 - 10,
      this.gameHeight / 2 + 20,
      "interpretLogoWithCat"
    );

    const logoExposeSetting: Number = this.isLocal ? 300 : 3000;
    await this.setDelay(logoExposeSetting);
    this.scene.start("GameScene");
  }
}

export default Preload;

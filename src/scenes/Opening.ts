import PhaserSceneTool from "./PhaserSceneTool";

class OpeningScene extends PhaserSceneTool {
  constructor() {
    super("OpeningScene");

    this.init();
  }

  init() {}

  create() {
    this.add.text(0, 0, "아무것도 보이지 않는다", {
      fontFamily: 'Nanum Gothic',
      fontSize: "40px",
    });
  }

  startGame() {
    this.scene.start("GameScene");
  }
}

export default OpeningScene;

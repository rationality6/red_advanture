import PhaserSceneTool from "./PhaserSceneTool";

class PreloadLogo extends PhaserSceneTool {
  scene: any;
  load: any;

  constructor() {
    super("PreloadLogoScene");
  }

  preload() {
    this.load.image(
      "interpretLogoWithCat",
      "assets/logo/interpret_logo_with_cat.png"
    );
  }
  create(){
    this.scene.start("PreloadScene");
  }
}

export default PreloadLogo;

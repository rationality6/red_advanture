import Player from "../entities/Player";
import PhaserSceneTool from "./PhaserSceneTool";

import VirtualJoystick from "phaser3-rex-plugins/plugins/virtualjoystick.js";

class OpeningScene extends PhaserSceneTool {
  textIndex: number = 0;
  text: string[] = [
    "아무것도 보이지 않는다",
    "어둠이 다시 찾아온다.",
    "…",
    "때로는 어둠 속에서 빛을 찾지 못해 후회만 가득할 때가 있다.",
    "피와 눈물이 섞인 땅 위에 남긴 상처를 지우려면,",
    "내 목숨이 필요할지도 모른다.",
    "유다: …",
    "기드온: 너의 과거는 네가 떠나보내려 해도 떠나지 않는다.",
    "그것이 너를 파멸로 이끌 것이다.",
  ];

  joyStickInfoText: string

  clickLock: boolean = false;
  mainText: Phaser.GameObjects.Text;
  bgmStarted: boolean = false;
  constructor() {
    super("OpeningScene");

    this.init();
  }

  init() {}

  dumpJoyStickState() {
    var cursorKeys = this.joyStick.createCursorKeys();
    var s = "Key down: ";
    for (var name in cursorKeys) {
      if (cursorKeys[name].isDown) {
        s += `${name} `;
      }
    }

    s += `
Force: ${Math.floor(this.joyStick.force * 100) / 100}
Angle: ${Math.floor(this.joyStick.angle * 100) / 100}
`;

    s += "\nTimestamp:\n";
    for (var name in cursorKeys) {
      var key = cursorKeys[name];
      s += `${name}: duration=${key.duration / 1000}\n`;
    }
    this.joyStickInfoText.setText(s);
  }

  create() {
    this.joyStick = this.plugins
      .get("rexvirtualjoystickplugin")
      .add(this, {
        x: 400,
        y: 300,
        radius: 100,
        base: this.add.circle(0, 0, 100, 0x888888),
        thumb: this.add.circle(0, 0, 50, 0xcccccc),
        // dir: '8dir',   // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
        // forceMin: 16,
        // enable: true
      })
      .on("update", this.dumpJoyStickState, this);

    this.joyStickInfoText = this.add.text(0, 0, "");

    this.mainText = this.add
      .text(
        this.gameWidth / 2,
        this.gameHeight / 2,
        this.text[this.textIndex],
        {
          fontFamily: "Nanum Gothic",
          fontSize: "40px",
        }
      )
      .setOrigin(0.5, 0.5);

    // "Click to start game"

    this.skipText = this.add
      .text(this.gameWidth, this.gameHeight, "Skip", {
        fontFamily: "Nanum Gothic",
        fontSize: "25px",
      })
      .setOrigin(1.5, 1.5);

    this.skipText.setInteractive();

    this.tweens.add({
      targets: this.skipText,
      alpha: { from: 0.8, to: 0.3 },
      ease: "Sine.InOut",
      duration: 2000,
      yoyo: true,
      repeat: -1,
    });

    this.skipText.on("pointerdown", (pointer) => {
      if (!this.bgmStarted) {
        return;
      }
      this.startGame();
    });

    this.input.on("pointerdown", async (pointer) => {
      if (this.clickLock) {
        return;
      }

      if (!this.bgmStarted) {
        this.bgmStarted = true;
        this.sound.play("opening", { loop: true });
      }

      this.clickLock = true;

      this.tweens.add({
        targets: this.mainText,
        alpha: { from: 1, to: 0 },
        ease: "Sine.InOut",
        duration: 2000,
        repeat: 0,
      });

      await this.setDelay(2000);

      this.textIndex += 1;

      this.tweens.add({
        targets: this.mainText,
        alpha: { from: 0, to: 1 },
        ease: "Sine.InOut",
        duration: 2000,
        repeat: 0,
      });

      await this.setDelay(2000);
      this.clickLock = false;
    });

    new Player(this, 300, 500).setScale(4);
  }

  startGame() {
    this.sound.stopAll();
    this.scene.start("GameScene");
  }

  update() {
    this.mainText.setText(this.text[this.textIndex]);

    if (this.textIndex === 10) {
      this.startGame();
    }
  }
}

export default OpeningScene;

import GameGeneral from "./GameGeneral";

class OpeningScene extends GameGeneral {
  textIndex: number = 0;
  text: string[] = [
    "피와 눈물이 섞인 땅 위에 남긴 상처를 지우려면,",
    "내 목숨이 필요할지도 모른다.",
    "레드 어드벤처의 튜토리얼입니다. 뿌잉뿌잉",
    "이동은 방향키, space 점프, 2단점프",
    "z 공격, 3연타 공격",
    "x 파이어볼",
    "입니다.",
    "클릭하면 다음으로 넘어갑니다.",
  ];

  joyStickInfoText: string;
  keyDownState: string;

  clickLock: boolean = false;
  mainText: Phaser.GameObjects.Text;
  bgmStarted: boolean = false;

  constructor() {
    super("OpeningScene");
  }

  joyStickState() {
    var cursorKeys = this.joyStick.createCursorKeys();
    var s = "Key down: ";
    for (var name in cursorKeys) {
      if (cursorKeys[name].isDown) {
        s += `${name} `;
        this.keyDownState = name;
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
    super.create();

    this.catGroup.createCat(770, 400);
    this.catGroup.createCat(800, 400);

    // this.joyStick = this.plugins
    //   .get("rexvirtualjoystickplugin")
    //   .add(this, {
    //     x: 200,
    //     y: 400,
    //     radius: 100,
    //     base: this.add.circle(0, 0, 100, 0x888888),
    //     thumb: this.add.circle(0, 0, 50, 0xcccccc),
    //     // dir: '8dir',   // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
    //     // forceMin: 16,
    //     // enable: true
    //   })
    //   .on("update", this.joyStickState, this);

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
        duration: 1000,
        repeat: 0,
      });

      await this.setDelay(1000);

      this.textIndex += 1;

      this.tweens.add({
        targets: this.mainText,
        alpha: { from: 0, to: 1 },
        ease: "Sine.InOut",
        duration: 1000,
        repeat: 0,
      });

      await this.setDelay(1000);
      this.clickLock = false;
    });
  }

  startGame() {
    this.sound.stopAll();
    this.scene.start("GreenScene", { foo: "bar" });
  }

  update() {
    this.mainText.setText(this.text[this.textIndex]);

    if (this.textIndex === 8) {
      this.startGame();
    }

    if (this.keyDownState == "left") {
      this.player.moveLeft();
    }
    if (this.keyDownState == "right") {
      this.player.moveRight();
    }
    if (this.keyDownState == "up") {
      this.player.moveUp();
    }
  }
}

export default OpeningScene;

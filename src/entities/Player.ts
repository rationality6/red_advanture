import initAnimations from "./playerAnims";
import collidable from "../mixins/collidable";

class Player extends Phaser.Physics.Arcade.Sprite {
  private cursors: any;
  private gravity: number = 500;
  private jumpCount: number = 0;

  constructor(scene: any, x: number, y: number, key: string) {
    super(scene, x, y, key);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    // mixins
    Object.assign(this, collidable);

    this.init();
    // this.setInput();
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  init(): void {
    this.body.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);

    this.cursors = this.scene.input.keyboard.createCursorKeys();

    initAnimations(this.scene.anims);
  }

  setInput() {
    const arrowRight = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.RIGHT
    );
    arrowRight.on("down", () => {
      this.setFlipX(false);
      this.setVelocityX(300);
    });
    arrowRight.on("up", () => {
      this.setFlipX(false);
      this.setVelocityX(0);
    });

    const arrowLeft = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.LEFT
    );
    arrowLeft.on("down", () => {
      this.setFlipX(true);
      this.setVelocityX(-300);
    });
    arrowLeft.on("up", () => {
      this.setFlipX(true);
      this.setVelocityX(0);
    });

    const keySpace = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    keySpace.on("down", () => {
      this.setVelocityY(-500);
    });
  }

  update() {
    const { left, right, space, up } = this.cursors;
    const onFloor = this.body.onFloor();
    const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(space);
    const isUpJustDown = Phaser.Input.Keyboard.JustDown(up);

    if (left.isDown) {
      this.setVelocityX(-300);
      this.setFlipX(true);
    } else if (right.isDown) {
      this.setVelocityX(300);
      this.setFlipX(false);
    } else {
      this.setVelocityX(0);
    }

    if ((isSpaceJustDown || isUpJustDown) && (onFloor || this.jumpCount < 1)) {
      this.setVelocityY(-400);
      this.jumpCount += 1;
    }

    if (onFloor) {
      this.jumpCount = 0;
    }

    onFloor
      ? this.body.velocity.x !== 0
        ? this.play("run", true)
        : this.play("idle", true)
      : this.play("jump", true);
  }
}

export default Player;

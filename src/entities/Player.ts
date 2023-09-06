import initAnimations from "./anims/playerAnims";
import collidable from "../mixins/collidable";
import Projectile from "../attacks/Projectile";

class Player extends Phaser.Physics.Arcade.Sprite {
  private cursors: any;
  private gravity: number = 500;
  private jumpCount: number = 0;
  private moveSpeed: number = 200;

  private hasBeenHit: boolean = false;
  bounceVelocity: number = 250;

  private constructor(scene: any, x: number, y: number, key: string) {
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

    this.scene.input.keyboard.on("keydown-Z", () => {
      console.log("z");
      const projectile = new Projectile(
        this.scene,
        this.x,
        this.y,
        "fireball",
        this.flipX ? -1 : 1
      );
    });
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
      this.setVelocityY(-400);
    });
  }

  update() {
    if (this.hasBeenHit) {
      return;
    }
    const { left, right, space, up } = this.cursors;
    const onFloorValue = this.body.onFloor();
    const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(space);
    const isUpJustDown = Phaser.Input.Keyboard.JustDown(up);

    if (left.isDown) {
      this.setVelocityX(-this.moveSpeed);
      this.setFlipX(true);
    } else if (right.isDown) {
      this.setVelocityX(this.moveSpeed);
      this.setFlipX(false);
    } else {
      this.setVelocityX(0);
    }

    this.jumpCheck(isSpaceJustDown, isUpJustDown, onFloorValue);

    if (onFloorValue) {
      this.jumpCount = 0;
    }

    onFloorValue
      ? this.body.velocity.x !== 0
        ? this.play("run", true)
        : this.play("idle", true)
      : this.play("jump", true);
  }

  playDamageTween() {
    return this.scene.tweens.add({
      targets: this,
      duration: 200,
      repeat: -1,
      tint: 0xffffff,
    });
  }

  jumpCheck(isSpaceJustDown, isUpJustDown, onFloor) {
    if ((isSpaceJustDown || isUpJustDown) && (onFloor || this.jumpCount < 1)) {
      this.scene.sound.add("jumpSound").play();
      this.setVelocityY(-350);
      this.jumpCount += 1;
    }
  }

  bounceOff() {
    this.body.touching.right
      ? this.setVelocity(-this.bounceVelocity, -this.bounceVelocity)
      : this.setVelocity(this.bounceVelocity, -this.bounceVelocity);
  }

  takesHit(initiator) {
    this.hasBeenHit = true;
    this.bounceOff();
    const hitAnim = this.playDamageTween();

    this.scene.time.delayedCall(1000, () => {
      this.hasBeenHit = false;
      hitAnim.stop();
      this.clearTint();
    });
  }
}

export default Player;

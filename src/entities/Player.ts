import initAnimations from "./anims/playerAnims";
import initLafullAnimations from "./anims/lafullAnims";
import collidable from "../mixins/collidable";

import Projectiles from "../attacks/Projectiles";

import MeleeCollides from "../attacks/MeleeCollides";

import anims from "../mixins/anims";

class Player extends Phaser.Physics.Arcade.Sprite {
  private cursors: any;
  private gravity: number = 500;
  private jumpCount: number = 0;
  private moveSpeed: number = 200;

  private comboTimeoutId: any;
  private comboCount: number = 0;

  private middleOfAttackTimeOutId: any;

  private lastDirection: Phaser.Physics.Arcade.Facing =
    Phaser.Physics.Arcade.FACING_RIGHT;

  private hasBeenHit: boolean = false;
  bounceVelocity: number = 250;

  private middleOfAttack: boolean = false;
  private middleOfCombo: boolean = false;

  // meleeWeapon: MeleeWeapon;
  meleeCollides: any;

  private constructor(scene: any, x: number, y: number, key: string) {
    super(scene, x, y, key);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    // mixins
    Object.assign(this, collidable);
    Object.assign(this, anims);

    this.init();
    // this.setInput();
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  init(): void {
    this.setSize(14, 40);
    this.setOffset(75, 64);
    this.body.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);

    this.cursors = this.scene.input.keyboard.createCursorKeys();

    initAnimations(this.scene.anims);
    initLafullAnimations(this.scene.anims);

    this.projectiles = new Projectiles(this.scene);

    this.scene.input.keyboard.on("keydown-Z", () => {
      if ((this.middleOfAttack && this.comboCount <= 1) || this.hasBeenHit) {
        clearTimeout(this.middleOfAttackTimeOutId);
        this.middleOfAttackTimeOutId = setTimeout(() => {
          const ke = new KeyboardEvent("keydown", {
            bubbles: true,
            cancelable: true,
            keyCode: 90,
          });
          document.body.dispatchEvent(ke);
        }, 100);
        return;
      }

      if (this.comboCount == 0) {
        this.meleeAttack();
      } else if (this.comboCount == 1) {
        this.meleeAttack2();
      } else {
        this.meleeAttack3();
      }

      this.middleOfCombo = true;
      this.comboCount += 1;
      if (this.comboCount > 2) {
        this.comboCount = 0;
      }

      clearTimeout(this.comboTimeoutId);
      this.comboTimeoutId = setTimeout(() => {
        this.comboCount = 0;
        this.middleOfCombo = false;
      }, 700);
    });

    this.scene.input.keyboard.on("keydown-X", () => {
      this.projectiles.fireProjectile(this);
    });

    this.meleeCollides = new MeleeCollides(this.scene, 0, 0, this);
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

  moveLeft() {
    this.lastDirection = Phaser.Physics.Arcade.FACING_LEFT;
    this.setVelocityX(-this.moveSpeed);
    this.setFlipX(true);
    this.play("lafull-run", true)
  }

  moveRight() {
    this.lastDirection = Phaser.Physics.Arcade.FACING_RIGHT;
    this.setVelocityX(this.moveSpeed);
    this.setFlipX(false);
  }
  moveUp(){
    this.setVelocityY(-400);
  }

  update() {
    if (this.hasBeenHit) {
      return;
    }

    if (this.middleOfAttack) {
      return;
    }

    if (this.middleOfCombo) {
      return;
    }

    const { left, right, space, up } = this.cursors;
    const onFloorValue = this.body.onFloor();
    const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(space);
    const isUpJustDown = Phaser.Input.Keyboard.JustDown(up);

    if (left.isDown) {
      this.lastDirection = Phaser.Physics.Arcade.FACING_LEFT;
      this.setVelocityX(-this.moveSpeed);
      this.setFlipX(true);
    } else if (right.isDown) {
      this.lastDirection = Phaser.Physics.Arcade.FACING_RIGHT;
      this.setVelocityX(this.moveSpeed);
      this.setFlipX(false);
    } else {
      this.setVelocityX(0);
    }

    this.jumpCheck(isSpaceJustDown, isUpJustDown, onFloorValue);

    if (onFloorValue) {
      this.jumpCount = 0;
    }

    if (this.isPlayingAnims("lafull-attack2")) {
      return;
    }

    onFloorValue
      ? this.body.velocity.x !== 0
        ? this.play("lafull-run", true)
        : this.play("lafull-idle", true)
      : this.play("lafull-jump", true);
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
      this.scene.sound.add("jumpSound").play({ volume: 0.1 });
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

  reduceVelocity() {
    if (this.body.velocity.x !== 0 || this.body.velocity.y !== 0) {
      this.setVelocityX(this.body.velocity.x / 3);
      this.setVelocityY(this.body.velocity.y / 3);
    }
  }

  meleeAttack() {
    this.middleOfAttack = true;
    this.reduceVelocity();

    this.play("lafull-attack1", true);

    this.scene.time.delayedCall(380, () => {
      this.meleeCollides.swing(this.x, this.y);
      this.scene.sound.play("lightSaber", { volume: 0.1 });

      this.middleOfAttack = false;
    });
  }

  meleeAttack2() {
    this.middleOfAttack = true;
    this.reduceVelocity();

    this.play("lafull-attack2", true);

    this.scene.time.delayedCall(380, () => {
      this.scene.sound.play("lightSaber", { volume: 0.1 });
      this.middleOfAttack = false;
    });
  }

  meleeAttack3() {
    this.middleOfAttack = true;
    this.reduceVelocity();

    this.play("lafull-attack3", true);

    this.scene.time.delayedCall(580, () => {
      this.scene.sound.play("ruruSpecialLaser", { volume: 0.1 });
      this.middleOfAttack = false;
    });
  }
}

export default Player;

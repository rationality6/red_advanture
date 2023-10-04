import initAnims from "./anims/catAnims";

class CatLaying extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "catLaying");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    initAnims(this.scene.anims);

    this.setSize(10, 10);

    this.init();
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);

    this.play("catLaying", true);
  }

  init(): void {
    this.setScale(1)
  }
}

export default CatLaying
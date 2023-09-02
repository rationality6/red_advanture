class CatLaying extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "catLaying");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.init();
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  init(): void {
    this.setScale(1)
  }

  update(time, delta) {
    super.update(time, delta);
    this.play("catLaying", true);
  }
}

export default CatLaying
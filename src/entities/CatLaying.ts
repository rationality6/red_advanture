class CatLaying extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "catLaying");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setSize(10, 10);
    
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);

    this.play("catLaying", true);
  }
}

export default CatLaying
class MeleeWeapon extends Phaser.Physics.Arcade.Sprite {
  wielder: any = null;
  
  damege: number = 15
  attackSpeed: number = 1000;

  weaponName: string;

  constructor(scene, x, y, weaponName) {
    super(scene, x, y, weaponName);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.weaponName = weaponName;
    

    this.activeteWeapon(false);

    this.on('animationcomplete', () => {
      this.scene.middleOfAttack = false;
      this.setActive(false);
      this.setVisible(false);
    })
  }

  swing(wielder) {
    this.wielder = wielder;
    this.activeteWeapon(true);
    this.body?.reset(wielder.x, wielder.y);

    this.anims.play(`lafull-attack1`, true);
  }

  activeteWeapon(isActive) {
    this.setActive(isActive);
    this.setVisible(isActive);
  }
}

export default MeleeWeapon;

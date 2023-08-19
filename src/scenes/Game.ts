import Phaser from 'phaser';

export default class Demo extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.image('logo', 'assets/phaser3-logo.png');

    this.load.tilemapTiledJSON('map', 'assets/json_exporta.tmj');
    this.load.image('tiles-1', 'assets/main_lev_build_1.png');
    // this.load.image('tiles-2', 'assets/main_lev_build_2.png');
  }

  create() {
    const logo = this.add.image(400, 70, 'logo');
    logo.displayHeight = 50;
    logo.displayWidth = 180;

    this.tweens.add({
      targets: logo,
      y: 350,
      duration: 1500,
      ease: 'Sine.inOut',
      yoyo: true,
      repeat: -1
    });

    const map = this.make.tilemap({ key: 'map' });
    const tileset1 = map.addTilesetImage('main_lev_build_1', 'tiles-1');
    // const tileset2 = map.addTilesetImage('main_lev_build_2', 'tiles-2');

    map.createLayer('moss', tileset1,0,0); 
    map.createLayer('field', tileset1, 0, 0); 
    map.createLayer('trees', tileset1, 0, 0); 
    map.createLayer('leafs', tileset1, 0, 0); 

  }
}

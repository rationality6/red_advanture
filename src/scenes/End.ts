import Player from "../entities/player";
import BirdMan from "../entities/BirdMan";
import CatLaying from "../entities/CatLaying";

import Cats from "../groups/Cats";
import Enemies from "../groups/Enemies";
import Coins from "../groups/Coins";

import cameraMixin from "../mixins/cameraMixin";
import minimapMixin from "../mixins/minimapMixin";

import HitProjectile from "../attacks/HitProjectile";

import GameGeneral from "./GameGeneral";

export default class EndScene extends GameGeneral {
  private colliderLayer: any;
  coins: Coins;

  constructor(config) {
    super("EndScene");

    this.config = config;

    Object.assign(this, cameraMixin);
    Object.assign(this, minimapMixin);
  }

  create() {
    super.create()
    const map = this.make.tilemap({ key: "map2" });
    // const tileset1 = map.addTilesetImage("tile_set", "tiles-1");
    const tileset2 = map.addTilesetImage("tile_set", "tiles-2");

    this.colliderLayer = map.createLayer("colliderLayer", tileset2, 0, 0);
    map.createLayer("fieldLayer", tileset2!, 0, 0);

    const enemySpawns = map.getObjectLayer("enemies");

    this.colliderLayer.setCollisionByProperty({ collides: true });

    this.player.addCollider(this.colliderLayer);

    const back = this.getPlayerZones(map).back;

    this.background = this.add
      .tileSprite(0, 0, this.gameWidth, this.gameHeight, "sky2")
      .setDepth(-1)
      .setOrigin(0, 0);

    this.createEndOfLevel(this.player, back);

    this.setupFollowupCameraOn(this.player);
    this.setMiniMap();

    const catGroup = new Cats(this);
    const cat1 = new CatLaying(this, 270, 365);
    catGroup.add(cat1);
    const cat2 = new CatLaying(this, 50, 90);
    catGroup.add(cat2);
    catGroup.addCollider(this.player, (cat) => {
      this.sound.play("meow");
      this.coins.createCoins(10, cat);
    });

    const enemiesGroup = this.createEnemySpawns(enemySpawns);
    enemiesGroup.addCollider(this.colliderLayer);
    enemiesGroup.addCollider(this.player, this.onPlayerCollision);
    enemiesGroup.addCollider(this.player.projectiles, this.onWeaponHit);
    enemiesGroup.addOverlap(this.player.meleeCollides, this.onWeaponHit);


    this.coins.addCollider(this.colliderLayer);
  }

  onWeaponHit(entity, source) {
    new HitProjectile(this.scene, source.x, source.y);
    entity.takesHit(source);
  }

  onPlayerCollision(enemy: BirdMan, player: Player) {
    player.takesHit();
  }

  getPlayerZones(map: any) {
    const playerZones = map.getObjectLayer("zones").objects;
    return {
      back: playerZones.find((zone) => zone.name === "backZone"),
    };
  }

  createEndOfLevel(player, end) {
    const endOfSprite = this.physics.add
      .sprite(end.x, end.y, "end")
      .setSize(5, 200);

    this.physics.add.overlap(player, endOfSprite, () => {
      console.log("end");
      this.add.image(400, 300, "interpretLogoWithCat");
    });
  }

  createEnemySpawns(spawnLayer) {
    const enemies = new Enemies(this);
    const enemyTypes = enemies.getTypes();

    spawnLayer.objects.forEach((spawnPoint) => {
      const enemy = new enemyTypes[spawnPoint.type](
        this,
        spawnPoint.x,
        spawnPoint.y
      );
      enemy.setPlatformColliders(this.colliderLayer);
      enemy.setPlayer(this.player);
      enemies.add(enemy);
    });

    return enemies;
  }
  update(time: number, delta: number): void {}
}

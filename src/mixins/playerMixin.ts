import Player from "../entities/Player"

export default {
  player: Player,

  createPlayer(x, y) {
    this.player = new Player(this, x, y, "lafull-idle");
  }
}
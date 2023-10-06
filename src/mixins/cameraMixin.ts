export default {
  setupFollowupCameraOn(player) {
    this.cameras.main.setBounds(0, 0, 1200, 600).setZoom(1.8);
    this.cameras.main.startFollow(player);
  },

  setupHalfFollowupCameraOn(player) {
    this.cameras.main.setSize(600, 600).setZoom(1.8);
    this.cameras.main.setBounds(0, 0, 1200, 600)
    this.cameras.main.startFollow(player);

    this.cameras.main.rotation -= 0.50

    this.cameras2 = this.cameras.add(500, 0, 200, 200).setZoom(1.8);
    this.cameras2.setBounds(0, 0, 1200, 600)
    this.cameras2.startFollow(player, false, 0.5, -0.5);
  },

};

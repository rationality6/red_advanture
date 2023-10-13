export default {
  setupFollowupCameraOn() {
    this.cameras.main.setBounds(0, 0, 1200, 600).setZoom(1.8);
    this.cameras.main.startFollow(this.player);
  },

  setupHalfFollowupCameraOn() {
    this.cameras.main.setSize(600, 600).setZoom(1.8);
    this.cameras.main.setBounds(0, 0, 1200, 600)
    this.cameras.main.startFollow(this.player);

    this.cameras.main.rotation -= 0.60

    this.cameras3 = this.cameras.add(600, 0, 600, 600).setZoom(1.8);
    this.cameras3.setBounds(0, 0, 1200, 600)
    this.cameras3.startFollow(this.player, false, 0.5, -0.5);

    this.cameras2 = this.cameras.add(500, 100, 200, 200).setZoom(1.8);
    this.cameras2.setBounds(0, 0, 1200, 600)
    this.cameras2.startFollow(this.player, false, 0.5, -0.5)
  },

};

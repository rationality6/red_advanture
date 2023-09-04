export default {
  setupFollowupCameraOn(player) {
    this.cameras.main.setBounds(0, 0, 1200, 600).setZoom(1.8);
    this.cameras.main.startFollow(player);
  },
};

export default {
  setMiniMap() {
    this.minimap = this.cameras
      .add(400, 5, 400, 100)
      .setZoom(0.3)
      .setName("mini");
    this.minimap.setBackgroundColor(0x002244);
    this.minimap.scrollX = 200;
    this.minimap.scrollY = 500;
  },
};

export default (anims) => {
  anims.create({
    key: "birdman-idle",
    frames: anims.generateFrameNumbers("birdman-idle", { start: 0, end: 12 }),
    frameRate: 8,
    repeat: -1,
  });
};

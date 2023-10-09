export default (anims) => {
  anims.create({
    key: "coin",
    frames: anims.generateFrameNumbers("coin", {
      start: 0,
      end: 5,
    }),
    frameRate: 10,
    repeat: -1,
  });
};

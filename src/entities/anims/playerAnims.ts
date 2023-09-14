export default (anims) => {
  anims.create({
    key: "idle",
    frames: anims.generateFrameNumbers("player", {
      start: 0,
      end: 8,
    }),
    frameRate: 10,
    repeat: -1,
  });

  anims.create({
    key: "run",
    frames: anims.generateFrameNumbers("player", {
      start: 11,
      end: 16,
    }),
    frameRate: 10,
    repeat: -1,
  });

  anims.create({
    key: "jump",
    frames: anims.generateFrameNumbers("player", {
      start: 17,
      end: 23,
    }),
    frameRate: 3,
    repeat: 1,
  });

  anims.create({
    key: "throw",
    frames: anims.generateFrameNumbers("throw", {
      start: 0,
      end: 6,
    }),
    frameRate: 3,
    repeat: 1,
  });
};

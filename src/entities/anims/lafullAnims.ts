export default (anims) => {
  anims.create({
    key: "lafull-idle",
    frames: anims.generateFrameNumbers("lafull-idle", {
      start: 0,
      end: 9,
    }),
    frameRate: 10,
    repeat: -1,
  });

  anims.create({
    key: "lafull-run",
    frames: anims.generateFrameNumbers("lafull-run", {
      start: 0,
      end: 7,
    }),
    frameRate: 10,
    repeat: -1,
  });

  anims.create({
    key: "lafull-jump",
    frames: anims.generateFrameNumbers("lafull-jump", {
      start: 0,
      end: 2,
    }),
    frameRate: 10,
    repeat: -1,
  });

  anims.create({
    key: "lafull-attack1",
    frames: anims.generateFrameNumbers("lafull-attack1", {
      start: 0,
      end: 6,
    }),
    frameRate: 10,
    repeat: 0,
  });

  anims.create({
    key: "lafull-attack2",
    frames: anims.generateFrameNumbers("lafull-attack2", {
      start: 0,
      end: 6,
    }),
    frameRate: 10,
    repeat: 0,
  });

  anims.create({
    key: "lafull-attack3",
    frames: anims.generateFrameNumbers("lafull-attack3", {
      start: 0,
      end: 7,
    }),
    frameRate: 10,
    repeat: 0,
  });

  anims.create({
    key: "hitParticle",
    frames: anims.generateFrameNumbers("hitParticle", {
      start: 0,
      end: 3,
    }),
    frameRate: 10,
    repeat: 0,
  });
};

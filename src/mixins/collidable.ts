export default {
  addCollider(otherGameObject, callback) {
    this.scene.physics.add.collider(
      this,
      otherGameObject,
      callback,
      null,
      this
    );
  },

  addOverlap(otherGameObject, callback) {
    this.scene.physics.add.overlap(
      this,
      otherGameObject,
      callback,
      null,
      this
    );
  },

  frontRaycast(player, body) {
    const { x, y, width, halfHeight, halfWidth } = body;

    let line1 = new Phaser.Geom.Line();

    switch (body.facing) {
      case Phaser.Physics.Arcade.FACING_RIGHT: {
        line1.x1 = this.body.x + halfWidth;
        line1.y1 = this.body.y + halfHeight - 13;
        line1.x2 = this.body.x + 100;
        line1.y2 = this.body.y + halfHeight;

        break;
      }
      case Phaser.Physics.Arcade.FACING_LEFT: {
        line1.x1 = this.body.x + halfWidth;
        line1.y1 = this.body.y + halfHeight - 13;
        line1.x2 = this.body.x - 100;
        line1.y2 = this.body.y + halfHeight;

        break;
      }
    }

    let bodyRect = new Phaser.Geom.Rectangle(
      player.body.x,
      player.body.y,
      player.body.width,
      player.body.height
    );

    if (Phaser.Geom.Intersects.LineToRectangle(line1, bodyRect)) {
      this.setVelocityX(0);
    } else {
      this.setVelocityX(this.speed);
    }

    if (this.config.debug) {
      this.frontRayGraphics.clear();
      this.frontRayGraphics.strokeLineShape(line1);
    }
  },

  bodyPositionDifferenceX: 0,
  prevRay: null,
  prevHasHit: null,

  raycast(body, layer, raylength = 40, precision = 0) {
    const { x, y, width, halfHeight } = body;

    this.bodyPositionDifferenceX += Math.abs(body.x - body.prev.x);

    if (this.bodyPositionDifferenceX <= precision && this.prevHasHit !== null) {
      return {
        ray: this.prevRay,
        hasHit: this.prevHasHit,
      };
    }

    const line = new Phaser.Geom.Line();
    let hasHit = false;

    switch (body.facing) {
      case Phaser.Physics.Arcade.FACING_RIGHT: {
        line.x1 = x + width;
        line.y1 = y + halfHeight - 14;
        line.x2 = line.x1 + raylength - 15;
        line.y2 = line.y1 + raylength;

        break;
      }
      case Phaser.Physics.Arcade.FACING_LEFT: {
        line.x1 = x;
        line.y1 = y + halfHeight - 14;
        line.x2 = line.x1 - raylength + 15;
        line.y2 = line.y1 + raylength;

        break;
      }
    }

    const hits = layer.getTilesWithinShape(line);

    if (hits.length > 0) {
      hasHit = hits.some((hit) => hit.index !== -1);
      this.prevHasHit = hits.some((hit) => hit.index !== -1);
    }

    this.prevRay = line;
    this.bodyPositionDifferenceX = 0;

    return { ray: line, hasHit };
  },
};

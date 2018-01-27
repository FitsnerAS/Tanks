var Game = (function (game) {
    function Tank(enemy, speed, dx, dy, tile) {
        var that = this;
        var tankTiles = {
            up: [14, 15, 16, 17, 18, 19, 20, 21],
            right: [85, 59, 81, 103, 125, 147, 169, 191],
            down: [124, 37, 38, 39, 40, 41, 42, 43],
            left: [61, 60, 82, 104, 126, 148, 170, 192]
        };
        var _spriteIndex = 0;

        this.tankSize = 32;
        this.spriteColumns = 22;
        this.enemy = enemy;
        this.tile = tile || 124;
        this.speed = speed;
        this.dx = dx;
        this.dy = dy;
        this.move = function (direction, canMove) {

            if (_spriteIndex < (tankTiles.up.length - 1)) {
                _spriteIndex++;
            } else {
                _spriteIndex = 0;
            }

            switch (direction) {
                case 'up':
                    if (canMove({
                        nextX: that.dx,
                        nextY: that.dy - that.speed,
                        width: that.tankSize,
                        height: that.tankSize
                    })) {
                        that.dy -= that.speed;
                    }
                    this.tile = tankTiles.up[_spriteIndex];
                    break;
                case 'down':
                    if (canMove({
                        nextX: that.dx,
                        nextY: that.dy + that.speed,
                        width: that.tankSize,
                        height: that.tankSize
                    })) {
                        that.dy += that.speed;
                    }
                    this.tile = tankTiles.down[_spriteIndex];
                    break;
                case 'left':
                    if (canMove({
                        nextX: that.dx - that.speed,
                        nextY: that.dy,
                        width: that.tankSize,
                        height: that.tankSize
                    })) {
                        that.dx -= that.speed;
                    }
                    this.tile = tankTiles.left[_spriteIndex];

                    break;
                case 'right':
                    if (canMove({
                        nextX: that.dx + that.speed,
                        nextY: that.dy,
                        width: that.tankSize,
                        height: that.tankSize
                    })) {
                        that.dx += that.speed;
                    }
                    this.tile = tankTiles.right[_spriteIndex];
                    break;
            }
        };
    }
    game.Tank = Tank;
    return game;
})(Game || {});


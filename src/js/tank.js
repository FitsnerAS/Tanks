var Game = (function (game) {
    var options = game.options;
    var _tankSprite = new game.Sprite(options.source.tilesImg);
    var fireSound = new game.Sound(options.source.bullet);
    var explosion = new game.Sound(options.source.explosion);


    function Tank(enemy, speed, dx, dy, isLocalUser, isBot, direction, id) {
        var that = this;
        var tankTiles = null;
        var _spriteIndex = 0;

        if (enemy) {
            tankTiles = {
                up: [105, 219, 218, 217, 216, 215, 214, 213],
                right: [195, 197, 175, 153, 131, 109, 87, 65],
                down: [150, 241, 240, 239, 238, 237, 236, 235],
                left: [171, 196, 174, 152, 130, 108, 86, 64],
                upShoot: [105, 127, 127, 149, 149, 127, 127, 105],
                rightShoot: [195, 194, 194, 193, 193, 194, 194, 195],
                downShoot: [150, 128, 128, 106, 106, 128, 128, 150],
                leftShoot: [171, 172, 172, 173, 173, 172, 172, 171],
                deactivation: [2, 8, 0, 0, 1, 1, 2, 7]
            };
        } else {
            tankTiles = {
                up: [14, 15, 16, 17, 18, 19, 20, 21],
                right: [85, 59, 81, 103, 125, 147, 169, 191],
                down: [124, 37, 38, 39, 40, 41, 42, 43],
                left: [61, 60, 82, 104, 126, 148, 170, 192],
                upShoot: [14, 36, 36, 58, 58, 36, 36, 14],
                rightShoot: [85, 84, 84, 83, 83, 84, 84, 85],
                leftShoot: [61, 62, 62, 63, 63, 62, 62, 61],
                downShoot: [124, 102, 102, 80, 80, 102, 102, 124],
                deactivation: [8, 0, 0, 1, 1, 2, 2, 7]
            };
        }
        this.tankSprite = _tankSprite;
        this.direction = direction;
        this.id = id;
        this.size = options.tankSize;
        this.width = options.tankWidth;
        this.height = options.tankHeigth;
        this.spriteColumns = options.tankSpriteColumns;
        this.enemy = enemy;
        this.isLocalUser = isLocalUser;
        this.isBot = isBot;
        this.tile = tankTiles[direction][0];
        this.speed = speed;
        this.dx = dx;
        this.dy = dy;
        this.isShooting = false;
        this.isBullet = false;
        this.onFire = false;
        this.isDeactivated = false;
        this.deactivation = false;
        this.move = function (direction, collisionDetection) {
            this.direction = direction;
            var collisionObject = null;

            !this.onFire && iteration(tankTiles[direction].length);

            switch (direction) {
                case 'up':
                    collisionObject = collisionDetection({
                        nextX: that.dx,
                        nextY: that.dy - that.speed,
                        width: that.size,
                        height: that.size,
                        id: that.id
                    });
                    if (!collisionObject.map && !collisionObject.unit) {
                        that.dy -= that.speed;
                    }
                    if (!this.onFire) {
                        this.tile = tankTiles.up[_spriteIndex];
                    }
                    break;
                case 'down':
                    collisionObject = collisionDetection({
                        nextX: that.dx,
                        nextY: that.dy + that.speed,
                        width: that.size,
                        height: that.size,
                        id: that.id
                    });
                    if (!collisionObject.map && !collisionObject.unit) {
                        that.dy += that.speed;
                    }
                    if (!this.onFire) {
                        this.tile = tankTiles.down[_spriteIndex];
                    }
                    break;
                case 'left':
                    collisionObject = collisionDetection({
                        nextX: that.dx - that.speed,
                        nextY: that.dy,
                        width: that.size,
                        height: that.size,
                        id: that.id
                    });
                    if (!collisionObject.map && !collisionObject.unit) {
                        that.dx -= that.speed;
                    }
                    if (!this.onFire) {
                        this.tile = tankTiles.left[_spriteIndex];
                    }
                    break;
                case 'right':
                    collisionObject = collisionDetection({
                        nextX: that.dx + that.speed,
                        nextY: that.dy,
                        width: that.size,
                        height: that.size,
                        id: that.id
                    });
                    if (!collisionObject.map && !collisionObject.unit) {
                        that.dx += that.speed;
                    }
                    if (!this.onFire) {
                        this.tile = tankTiles.right[_spriteIndex];
                    }
                    break;
            }
            return collisionObject;
        };
        this.fire = function (Bullet) {
            this.isShooting = true;
            this.onFire = true;
            _spriteIndex = 0;
            var bullet = new Bullet(this.dx, this.dy, this.direction, this.speed * 4);
            bullet.__proto__ = this;
            fireSound.play();
            return bullet;
        };
        this.deactivate = function () {
            explosion.play();
            this.deactivation = true;
            _spriteIndex = 0;
        };
        this.onDeactivationAnimation = function () {
            if (!iteration(tankTiles[this.direction].length)) {
                this.isDeactivated = true;
            }
            this.tile = tankTiles.deactivation[_spriteIndex];
        };
        this.onFireAnimation = function () {
            if (!iteration(tankTiles[this.direction + 'Shoot'].length)) {
                this.onFire = false;
            }
            this.tile = tankTiles[this.direction + 'Shoot'][_spriteIndex];
        };

        function iteration(length) {
            if (_spriteIndex < length - 1) {
                _spriteIndex++;
            } else {
                _spriteIndex = 0;
            }
            return !!_spriteIndex;
        }
    }

    var Eagle = {
        dx: options.eagle.enterCoords.dx,
        dy: options.eagle.enterCoords.dy,
        tile: options.eagle.tile,
        size: options.eagle.size,
        height: options.eagle.height,
        width: options.eagle.width,
        isEagle: true,
        spriteColumns: game.options.tankSpriteColumns,
        tankSprite: _tankSprite
    };
    game.Tank = Tank;
    game.Eagle = Eagle;
    return game;
})(Game || {});


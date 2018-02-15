var Game = (function (game) {
    var options = game.options;

    function Bullet(dx, dy, direction, speed) {
        var bulletTiles = {
            up: 3,
            right: 5,
            down: 6,
            left: 4,
            deactivate: [8, 7, 7, 8]
        };
        var _deactivationIndex = 0;

        this.dx = dx;
        this.dy = dy;
        this.collisionDx = function () {
            return this.dx + options.deltaBulletDx;
        };
        this.collisionDy = function () {
            return this.dy + options.deltaBulletDy;
        };
        this.width = options.bulletWidth;
        this.height = options.bulletHeight;
        this.direction = direction;
        this.isBot = false;
        this.isLocalUser = false;
        this.speed = speed;
        this.tile = bulletTiles[this.direction];
        this.isBullet = true;
        this.isDeactivated = false;
        this.deactivation = false;
        this.deactivate = function () {
            this.__proto__.isShooting = false;
            this.deactivation = true;
        };
        this.onDeactivationAnimation = function () {

            if (_deactivationIndex < bulletTiles.deactivate.length - 1) {
                _deactivationIndex++;
            } else {
                _deactivationIndex = 0;
                this.isDeactivated = true;
            }
            this.tile = bulletTiles.deactivate[_deactivationIndex]
        };
        this.move = function (direction, collisionDetection) {
            var collisionObject = null;

            switch (direction) {
                case 'up':
                    collisionObject = collisionDetection({
                        nextX: this.collisionDx(),
                        nextY: this.collisionDy(),
                        width: this.width,
                        height: this.height,
                        id: this.id
                    });
                    if (!collisionObject.unit && !collisionObject.map) {
                        this.dy -= this.speed;
                    }
                    break;
                case 'down':
                    collisionObject = collisionDetection({
                        nextX: this.collisionDx(),
                        nextY: this.collisionDy(),
                        width: this.width,
                        height: this.height,
                        id: this.id
                    });
                    if (!collisionObject.unit && !collisionObject.map) {
                        this.dy += this.speed;
                    }
                    break;
                case 'left':
                    collisionObject = collisionDetection({
                        nextX: this.collisionDx(),
                        nextY: this.collisionDy(),
                        width: this.width,
                        height: this.height,
                        id: this.id
                    });
                    if (!collisionObject.unit && !collisionObject.map) {
                        this.dx -= this.speed;
                    }
                    break;
                case 'right':
                    collisionObject = collisionDetection({
                        nextX: this.collisionDx(),
                        nextY: this.collisionDy(),
                        width: this.width,
                        height: this.height,
                        id: this.id
                    });
                    if (!collisionObject.unit && !collisionObject.map) {
                        this.dx += this.speed;
                    }
                    break;
            }
            return collisionObject;
        };
    }

    game.Bullet = Bullet;
    return game;
})(Game || {});


var Game = (function (game) {
    var utils = game.utils;
    var collision = game.collision;
    var keys = game.keys;
    var options = game.options;
    var _botsApearenceInterval = null;
    var unitsActions = {};
    var events = game.events;

    unitsActions.localUnitAction = function () {
        unit = game.localUser;

        if (unit.deactivation) {
            unit.onDeactivationAnimation();
            return;
        }

        if (unit.onFire) {
            unit.onFireAnimation();
        }

        if (keys.fire && !unit.isShooting) {
            game.units.push(unit.fire(game.Bullet));
            events.publish('shoot');
            return;
        }
        if (keys.up) {
            unit.move(options.direction.up, collision.collisionObject);
            return;
        }
        if (keys.right) {
            unit.move(options.direction.right, collision.collisionObject);
            return;
        }
        if (keys.down) {
            unit.move(options.direction.down, collision.collisionObject);
            return;
        }
        if (keys.left) {
            unit.move(options.direction.left, collision.collisionObject);
            return;
        }
    };

    unitsActions.botsAction = function () {
        deletedUnits = [];
        newBullets = [];
        game.units.forEach(function (unit) {
            if (unit.isLocalUser || unit.isEagle) {
                return;
            }
            if (unit.deactivation) {
                unit.onDeactivationAnimation();
                return;
            }
            if (unit.isBot && unit.onFire) {
                unit.onFireAnimation();
            }
            var collisionObject = unit.move(unit.direction, collision.collisionObject);
            if (!unit.isBullet) {
                bootsChangeDirecitonAndFire(collisionObject, unit);

            } else if (collisionObject.map || collisionObject.unit) {
                removeInjuredUnitAndBullet(collisionObject, unit);
            }
        });
        reduceUnits();
    };

    function reduceUnits() {
        game.units = game.units.filter(function (unit) {
            return !unit.isDeactivated;
        });
    }

    function bootsChangeDirecitonAndFire(collisionObject, unit) {
        if (collisionObject.map) {
            unit.direction = utils.getRandomDirection();
        }
        if (collisionObject.unit && !collisionObject.unit.isBullet) {
            unit.direction = utils.getRandomDirection();
        }
        if (!unit.isShooting && utils.isReadyToShoot(options.shootingFrequency)) {
            game.units.push(unit.fire(game.Bullet));
        }
    }

    function removeInjuredUnitAndBullet(collisionObject, unit) {
        unit.deactivate();
        if (collisionObject.unit) {
            if (collisionObject.unit.isEagle || collisionObject.unit.isLocalUser) {
                gameOver();
                return;
            }
            if (collisionObject.unit.deactivation) {
                return;
            }
            if (collisionObject.unit.isBullet) {
                collisionObject.unit.deactivate();
                return;
            }
            if (collisionObject.unit.enemy !== unit.enemy) {
                collisionObject.unit.deactivate();
                events.publish('hit');
                return;
            }
        }
    }

    function gameOver() {
        game.units = [];
        clearInterval(_botsApearenceInterval);
        window.document.getElementsByClassName('popup__overlay')[0].classList.add('active');
        events.publish('gameOver');

    }

    function nextLevel() {
        game.currentLevel++;
        if (game.currentLevel < options.levelsCount) {
            window.document.getElementsByClassName('score')[0].classList.add('new-level');
            setTimeout(function () {
                game.reset(game.currentLevel);
                window.document.getElementsByClassName('score')[0].classList.remove('new-level');
                events.publish('nextLevel');
            }, options.botsApearenceInterval);
        } else {
            window.document.getElementsByClassName('score')[0].classList.add('new-level', 'win-game');
        }
    }

    unitsActions.initBots = function () {
        var botsCount = 0;
        var dx, dy = null;
        _botsApearenceInterval = setInterval(function () {
            if (botsCount === options.botsCount) {
                clearInterval(_botsApearenceInterval);
                return;
            }
            if (game.units.length > options.botsSaturation) {
                return;
            }
            dx = options.botsEnterCoords.dx[utils.getRandom(options.botsEnterCoords.dx.length)];
            dy = options.botsEnterCoords.dy;
            while (collision.collisionObject({
                nextX: dx,
                nextY: dy,
                width: options.tankWidth,
                height: options.tankHeigth,
                id: botsCount
            }).unit) {
                dx = options.botsEnterCoords.dx[utils.getRandom(utils.getRandom(options.botsEnterCoords.dx.length))];
            }
            game.units.push(new game.Tank(true, options.tanksSpeed, dx, dy, false, true, options.direction.down, botsCount));
            botsCount++
        }, options.botsApearenceInterval);
    };

    //events
    events.on('win', nextLevel);

    game.unitsActions = unitsActions;
    return game;
})(Game);
var Game = (function (game) {
    var utils = game.utils;
    var collision = game.collision;
    var keys = game.keys;
    var options = game.options;

    var GAME_OVER_TIMEOUT = 0;

    var _botsApearenceInterval = null;
    var unitsActions = {};
    var events = game.events;
    var _pause = false;
    var _modalWin = window.document.getElementsByClassName('popup__overlay')[0];
    var _modalHtml = window.document.getElementsByClassName('popup')[0];

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
        unit.tankMoveSound.stop();
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
        setTimeout(function () {
            game.units = [];
            clearInterval(_botsApearenceInterval);
            _modalWin.classList.add('active', 'white');
            _modalHtml.classList.add('game-over');
            _modalHtml.innerHTML = '<button id="restart-btn" class="start-btn" type="button">Restart</button>';
            events.publish('gameOver');
        }, GAME_OVER_TIMEOUT);
    }

    function nextLevel() {
        game.currentLevel++;
        _modalWin.classList.add('active');
        if (game.currentLevel < options.levelsCount) {
            _modalHtml.innerHTML = '<span class="next-level-span">Next Level</span>';
            setTimeout(function () {
                game.reset(game.currentLevel);
                _modalWin.classList.remove('active');
                events.publish('nextLevel');
            }, 3000);
        } else {
            _modalHtml.innerHTML ='<img src="src/img/1.jpg">';
        }
    }

    unitsActions.initBots = function () {
        var botsCount = 0;
        var dx, dy = null;
        _botsApearenceInterval = setInterval(function () {
            if (_pause) {
                return;
            }
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
                height: options.tankHeight,
                id: botsCount
            }).unit) {
                dx = options.botsEnterCoords.dx[utils.getRandom(utils.getRandom(options.botsEnterCoords.dx.length))];
            }
            game.units.push(new game.Tank(true, options.tanksSpeed, dx, dy, false, true, options.direction.down, botsCount));
            botsCount++
        }, options.botsApearenceInterval);
    };

    function togglePause() {
        _pause = !_pause;
        game.localUser.tankMoveSound.stop();
    }

    //events
    events.on('win', nextLevel);
    events.on('/pause', togglePause);

    game.unitsActions = unitsActions;
    return game;
})(Game);
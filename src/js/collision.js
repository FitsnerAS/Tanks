var Game = (function (game) {
    var map = game.map;

    function isNextPositionAvailable(currentUnit) {
        return map.isNextPositionAvailable(currentUnit) && !areUnitsColliding(currentUnit)
    }

    function collisionObject(currentUnit) {
        if (!map.isNextPositionAvailable(currentUnit)) {
            return {
                map: true,
                unit: null
            };
        }
        var currentUnitX1 = currentUnit.nextX;
        var currentUnitX2 = currentUnit.nextX + currentUnit.width;
        var currentUnitY1 = currentUnit.nextY;
        var currentUnitY2 = currentUnit.nextY + currentUnit.height;
        var collisionObject = game.units.filter(function (unit, i, arr) {
            if (unit.id === currentUnit.id) {
                return false;
            }
            var secondUnitX1 = unit.dx;
            var secondUnitX2 = unit.dx + unit.width;
            var secondUnitY1 = unit.dy;
            var secondUnitY2 = unit.dy + unit.height;

            var areCollidingOnX = secondUnitX1 > currentUnitX1 && secondUnitX1 < currentUnitX2 ||
                currentUnitX1 >= secondUnitX1 && currentUnitX1 < secondUnitX2;
            var areCollidingOnY = secondUnitY1 > currentUnitY1 && secondUnitY1 < currentUnitY2 ||
                currentUnitY1 >= secondUnitY1 && currentUnitY1 < secondUnitY2;
            if (areCollidingOnX && areCollidingOnY) {
                _collisionUnit = unit;
                return true;
            }
            return areCollidingOnX && areCollidingOnY;
        });
        if (collisionObject.length) {
            return {
                map: false,
                unit: collisionObject[0]
            }
        } else {
            return {
                map: false,
                unit: null
            }
        }
    }

    game.collision = {
        isNextPositionAvailable: isNextPositionAvailable,
        collisionObject: collisionObject
    };
    return game;
})(Game);
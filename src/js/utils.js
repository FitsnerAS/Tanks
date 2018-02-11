var Game = (function (game) {
    var _directionsArr = Object.values(game.options.direction);
    var utils = {};

    utils.getRandomDirection = function () {
        var randInt = Math.floor(Math.random() * Math.floor(_directionsArr.length));
        return _directionsArr[randInt];
    };
    utils.isReadyToShoot = function (max) {
        var randInt = Math.floor(Math.random() * Math.floor(max));
        return !randInt;
    };
    utils.getRandom = function (max) {
        return Math.floor(Math.random() * Math.floor(max));
    };

    game.utils = utils;
    return game;
})(Game);
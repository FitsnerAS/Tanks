var Game = (function (game) {
    var events = {};

    events.on = function (eventName, fn) {
        events[eventName] = events[eventName] || [];
        events[eventName].push(fn);
    };

    events.off = function (eventName, fn) {
        if (events[eventName]) {
            for (var i = 0; i < events[eventName].length; i++) {
                if (events[eventName][i] === fn) {
                    events[eventName].splice(i, 1);
                    break;
                }
            }
        }
    };

    events.publish = function (eventName, data) {
        if (events[eventName]) {
            events[eventName].forEach(function (fn) {
                fn(data);
            });
        }
    };


    game.events = events;
    return game;
})(Game || {});
var Game = (function (game) {
    game.options = {
        control: {
            up: 38,
            right: 39,
            down: 40,
            left: 37,
            fire: 32,
            pause: 80
        },
        direction: {
            up: 'up',
            right: 'right',
            down: 'down',
            left: 'left'
        },
        source: {
            tilesImg: 'src/img/tiles.png',
            mapImg: 'src/img/terrain.png',
            bullet:'src/sounds/bullet.mp3',
            explosion: 'src/sounds/Explosion.mp3',
            tankMove: 'src/sounds/Tank-Sound.mp3'
        },
        mapDescription: {
            tileSize: 32,
            mapWidth: 960,
            mapHeight: 640,
            columns: 30,
            rows: 20
        },

        spriteColumns: 21,
        tankSpriteColumns: 22,
        levelsCount: 2,
        botsCount: 3,
        shootingFrequency: 40,
        botsEnterCoords: {
            dx: [0, 448, 928],
            dy: 0
        },
        localUnitEnterCoords: {
            dx: 448,
            dy: 608
        },
        eagle: {
            enterCoords: {
                dx: 480,
                dy: 608
            },
            tile: 44,
            height: 32,
            size: 32,
            width: 32
        },
        tankWidth: 28,
        tankHeight: 28,
        tankSize: 32,
        deltaTankDx: 2,
        deltaTankDy: 2,
        bulletWidth: 10,
        bulletHeight: 10,
        deltaBulletDx: 11,
        deltaBulletDy: 11,
        tanksSpeed: 2,
        botsSaturation: 10,
        botsApearenceInterval: 3000, //ms
        initialLevel: 0,
        map: [{
            tiles: [
                [250, 250, 250, 250, 384, 384, 384, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 384, 384, 384, 384, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 384, 386, 384, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 384, 386, 386, 384, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 384, 386, 384, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 384, 386, 386, 384, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 384, 384, 384, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 384, 384, 384, 384, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 384, 384, 384, 384, 384, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 419, 250],
                [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 384, 405, 406, 385, 384, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 384, 426, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 384, 447, 448, 449, 384, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 384, 384, 384, 384, 384, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250],
                [58, 59, 60, 250, 250, 250, 295, 296, 297, 250, 250, 250, 250, 250, 250, 250, 250, 250, 295, 296, 297, 250, 250, 250, 250, 250, 250, 58, 59, 60],
                [79, 80, 81, 250, 250, 250, 316, 317, 318, 250, 250, 250, 250, 250, 250, 250, 250, 250, 316, 317, 318, 250, 250, 250, 250, 250, 250, 79, 80, 81],
                [100, 101, 102, 250, 250, 250, 337, 338, 339, 250, 250, 250, 250, 250, 250, 250, 250, 250, 337, 338, 339, 250, 250, 250, 250, 250, 250, 100, 101, 102],
                [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250],
                [250, 480, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 384, 385, 386, 387, 388, 384, 385, 386, 387, 388, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 250, 250, 250, 250, 420, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 250, 250, 420, 420, 420, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 420, 420, 420, 250, 250, 250, 480, 480, 250, 250, 250]
            ],
            background: [
                [401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403],
                [422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424],
                [443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445],
                [401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403],
                [422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424],
                [443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445],
                [401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403],
                [422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424],
                [443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445],
                [401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403],
                [422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424],
                [443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445],
                [401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403],
                [422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424],
                [443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445],
                [401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403],
                [422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424],
                [443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445, 443, 444, 445],
                [401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403, 401, 402, 403],
                [422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424, 422, 423, 424]
            ]
        }, {

            tiles: [
                [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 383, 383, 383, 250, 250, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 383, 383, 383, 250, 250, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 383, 383, 250, 250, 250, 250, 125, 125, 125, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 383, 383, 250, 250, 250, 250, 125, 125, 125, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 383, 383, 250, 250, 250, 250, 125, 125, 125, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 383, 383, 250, 250, 250, 250, 125, 125, 125, 250, 397, 250, 250, 250, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 383, 383, 250, 250, 250, 250, 125, 125, 125, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 383, 383, 383, 383, 383, 383, 383, 383, 250, 250, 250, 250, 125, 125, 125, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 383, 383, 383, 383, 383, 383, 383, 383, 250, 250, 250, 250, 125, 125, 125, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 383, 383, 383, 383, 383, 383, 383, 383, 250, 250, 250, 250, 125, 125, 125, 250, 250, 250, 250, 250, 250, 250, 250, 383, 383, 383],
                [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 125, 125, 125, 250, 250, 250, 250, 250, 250, 250, 250, 383, 383, 383],
                [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250],
                [383, 383, 383, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 394, 395, 250],
                [383, 383, 383, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 415, 416, 250],
                [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250],
                [250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250]
            ],
            background: [
                [113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 113, 112, 112, 112],
                [113, 113, 113, 112, 112, 112, 112, 113, 113, 113, 112, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 112, 112, 112, 112, 113, 112, 112, 112, 112],
                [113, 113, 113, 113, 113, 113, 113, 112, 112, 112, 112, 112, 112, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 112, 112, 112, 112, 112, 112, 112],
                [113, 113, 112, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 112, 112, 112, 113, 113, 113, 113, 113, 112, 113, 113, 112, 112, 112, 112, 112, 112],
                [113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 112, 112, 112, 112, 112],
                [113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 112, 112, 112, 112],
                [113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 112, 112, 112],
                [112, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 112, 112],
                [112, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 112, 112],
                [112, 113, 113, 113, 113, 113, 112, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 112, 113, 113, 113, 112, 112],
                [112, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 112, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 112],
                [112, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 112],
                [112, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 112],
                [112, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 112],
                [112, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 112],
                [112, 112, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 112, 113, 113, 113, 113, 113, 113, 112],
                [112, 112, 112, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 112],
                [112, 112, 112, 113, 113, 113, 113, 113, 113, 113, 112, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 112, 113, 113, 113],
                [112, 112, 112, 112, 112, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 112, 112, 112, 112, 112, 112, 113, 113, 113, 113, 113, 113, 113, 147],
                [113, 112, 112, 112, 112, 112, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 113, 112, 112, 112, 112, 113, 113, 113, 113]
            ]
        }]
    };

    return game;
})(Game || {});
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
var Game = (function (game) {
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext("2d");
        game.canvas = {
                canvas: canvas,
                context: context
        };

        return game;
})(Game || {});
var Game = (function (game) {
    var events = game.events;
    var keys = {};
    var control = game.options.control;
    function keySet(key, action) {
        switch (key) {
            case control.up:
                keys.up = action;
                break;
            case control.down:
                keys.down = action;
                break;
            case control.left:
                keys.left = action;
                break;
            case control.right:
                keys.right = action;
                break;
            case control.fire:
                keys.fire = action;
                break;
            case control.pause:
                !action && events.publish('/pause');
                break;
        }
    }

    window.document.addEventListener('keydown', function (ev) {
        keySet(ev.which, true);
    });
    window.document.addEventListener('keyup', function (ev) {
        keySet(ev.which, false);
    });

    game.keys = keys;
    return game;
})(Game || {});


var Game = (function (game) {
    var context = game.canvas.context;
    var canvas = game.canvas.canvas;
    function Sprite(spriteImg) {
        var sprite = new Image();
        sprite.src = spriteImg;

        this.drawImg = function (sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
            context.drawImage(sprite, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        };
        this.clearRect = function () {
            context.clearRect(0, 0, canvas.width, canvas.height);
        };
    }
    game.Sprite = Sprite;
    return game;
})(Game || {});


var Game = (function (game) {
    var tiles, background = [];
    var _isNextPositionAvailable = null;
    var _corners = null;
    var _nextPositionRow = null;
    var _nextPositionCol = null;
    var options = game.options;
    var _mapSprite = new game.Sprite(options.source.mapImg);

    game.map = {
        mapSprite: _mapSprite,
        setTiles: function (map) {
            tiles = map.tiles;
            background = map.background;
            return !!map;
        },
        columns: options.mapDescription.columns,
        rows: options.mapDescription.rows,
        tileSize: options.mapDescription.tileSize,
        mapWidth: options.mapDescription.mapWidth,
        mapHeight: options.mapDescription.mapHeight,
        getTile: function (col, row, second) {
            if (second) {
                return tiles[row][col] - 1;
            } else {
                return background[row][col] - 1;
            }

        },
        isNextPositionAvailable: function (tileBounds) {
            _isNextPositionAvailable = true;
            _corners = [{
                x: tileBounds.nextX,
                y: tileBounds.nextY
            }, {
                x: tileBounds.nextX + tileBounds.width,
                y: tileBounds.nextY
            }, {
                x: tileBounds.nextX,
                y: tileBounds.nextY + tileBounds.height
            }, {
                x: tileBounds.nextX + tileBounds.width,
                y: tileBounds.nextY + tileBounds.height
            }];

            _corners.some(function (corner) {
                _nextPositionRow = (corner.y % this.mapHeight) / this.tileSize | 0;
                _nextPositionCol = (corner.x % this.mapWidth) / this.tileSize | 0;
                var isOutOfBounds = corner.x < 0 || corner.x > this.mapWidth || corner.y < 0 || corner.y > this.mapHeight;
                if (isOutOfBounds || tiles[_nextPositionRow][_nextPositionCol] !== 250) {
                    _isNextPositionAvailable = false;
                    return true;
                }
            }.bind(this));

            return _isNextPositionAvailable;
        }
    };

    return game;
})(Game || {});



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
        var collisionObject = game.units.filter(function (unit) {
            if (unit.id === currentUnit.id) {
                return false;
            }
            var secondUnitX1 = unit.collisionDx();
            var secondUnitX2 = unit.collisionDx() + unit.width;
            var secondUnitY1 = unit.collisionDy();
            var secondUnitY2 = unit.collisionDy() + unit.height;

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
var Game = (function (game) {

    function Sound(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.volume = 0.05;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
        this.play = function () {
            this.sound.currentTime = 0;
            this.sound.play();
        };
        this.playAlways = function() {
            this.sound.play();
        };
        this.stop = function () {
            this.sound.pause();
        };
    }
    game.Sound = Sound;
    return game;
})(Game || {});
var Game = (function (game) {
    var options = game.options;
    var _tankSprite = new game.Sprite(options.source.tilesImg);
    var fireSound = new game.Sound(options.source.bullet);
    var explosion = new game.Sound(options.source.explosion);
    var tankMove = new game.Sound(options.source.tankMove);


    function Tank(enemy, speed, dx, dy, isLocalUser, isBot, direction, id) {
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
        this.tankMoveSound = tankMove;
        this.direction = direction;
        this.id = id;
        this.size = options.tankSize;
        this.width = options.tankWidth;
        this.height = options.tankHeight;
        this.spriteColumns = options.tankSpriteColumns;
        this.enemy = enemy;
        this.isLocalUser = isLocalUser;
        this.isBot = isBot;
        this.tile = tankTiles[direction][0];
        this.speed = speed;
        this.dx = dx;
        this.dy = dy;
        this.collisionDx = function () {
            return this.dx + options.deltaTankDx;
        };
        this.collisionDy = function () {
            return this.dy + options.deltaTankDy;
        };
        this.isShooting = false;
        this.isBullet = false;
        this.onFire = false;
        this.isDeactivated = false;
        this.deactivation = false;
        this.move = function (direction, collisionDetection) {
            this.isLocalUser && this.tankMoveSound.playAlways();
            this.direction = direction;
            var collisionObject = null;

            !this.onFire && iteration(tankTiles[direction].length);

            switch (direction) {
                case 'up':
                    collisionObject = collisionDetection({
                        nextX: this.collisionDx(),
                        nextY: this.collisionDy() - this.speed,
                        width: this.width,
                        height: this.height,
                        id: this.id
                    });
                    if (!collisionObject.map && !collisionObject.unit) {
                        this.dy -= this.speed;
                    }
                    if (!this.onFire) {
                        this.tile = tankTiles.up[_spriteIndex];
                    }
                    break;
                case 'down':
                    collisionObject = collisionDetection({
                        nextX: this.collisionDx(),
                        nextY: this.collisionDy() + this.speed,
                        width: this.width,
                        height: this.height,
                        id: this.id
                    });
                    if (!collisionObject.map && !collisionObject.unit) {
                        this.dy += this.speed;
                    }
                    if (!this.onFire) {
                        this.tile = tankTiles.down[_spriteIndex];
                    }
                    break;
                case 'left':
                    collisionObject = collisionDetection({
                        nextX: this.collisionDx() - this.speed,
                        nextY: this.collisionDy(),
                        width: this.width,
                        height: this.height,
                        id: this.id
                    });
                    if (!collisionObject.map && !collisionObject.unit) {
                        this.dx -= this.speed;
                    }
                    if (!this.onFire) {
                        this.tile = tankTiles.left[_spriteIndex];
                    }
                    break;
                case 'right':
                    collisionObject = collisionDetection({
                        nextX: this.collisionDx() + this.speed,
                        nextY: this.collisionDy(),
                        width: this.width,
                        height: this.height,
                        id: this.id
                    });
                    if (!collisionObject.map && !collisionObject.unit) {
                        this.dx += this.speed;
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
            this.isLocalUser && fireSound.play();
            return bullet;
        };
        this.deactivate = function () {
            explosion.play();
            this.isLocalUser && this.tankMoveSound.stop();
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
        collisionDx: function () {
            return options.eagle.enterCoords.dx;
        },
        collisionDy: function () {
            return options.eagle.enterCoords.dy;
        },
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
            _modalWin.classList.add('active');
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
            _modalHtml.innerHTML ='<img src="../../src/img/1.jpg">';
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
var Game = (function (game) {
    var options = game.options;
    var map = game.map;
    var events = game.events;
    game.units = [];
    var unitsActions = game.unitsActions;
    var _gameInterval = null;
    game.currentLevel = options.initialLevel;
    var _pause = false;

    function drawGame() {
        if (_pause) {
            return;
        }
        map.mapSprite.clearRect();
        drawMap();
        drawUnits();
    }

    function drawMap() {
        var x = null;
        var y = null;
        for (var column = 0; column < map.columns; column++) {
            for (var row = 0; row < map.rows; row++) {
                x = column * map.tileSize;
                y = row * map.tileSize;
                drawMapTile(map.getTile(column, row), x, y);
                drawMapTile(map.getTile(column, row, true), x, y);
            }
        }

    }

    function drawMapTile(tile, x, y) {
        map.mapSprite.drawImg(
            (tile % options.spriteColumns) * map.tileSize,
            Math.floor(tile / options.spriteColumns) * map.tileSize,
            map.tileSize, map.tileSize,
            x, y, map.tileSize, map.tileSize);
    }

    function drawUnits() {
        unitsActions.localUnitAction();
        unitsActions.botsAction();
        game.units.forEach(function (unit) {
            unit.tankSprite.drawImg(
                (unit.tile % unit.spriteColumns) * unit.size,
                Math.floor(unit.tile / unit.spriteColumns) * unit.size,
                unit.size, unit.size,
                unit.dx, unit.dy, unit.size, unit.size);
        });
    }

    function init(level) {
        level = level || options.initialLevel;
        map.setTiles(options.map[level]);
        unitsActions.initBots();
        game.localUser = new game.Tank(false, options.tanksSpeed, options.localUnitEnterCoords.dx,
            options.localUnitEnterCoords.dy, true, false, options.direction.up, 21);
        game.units.push(game.Eagle);
        game.units.push(game.localUser);
        _gameInterval = setInterval(drawGame, 24);
    }

    function reset(nextLevel) {
        nextLevel = nextLevel || options.initialLevel;
        game.units = [];
        clearInterval(_gameInterval);
        init(nextLevel);
    }

    function togglePause() {
        _pause = !_pause;
    }

    // Events
    events.on('/pause', togglePause);

    game.init = init;
    game.reset = reset;
    return game;
})(Game || {});
(function (game) {
    var utils = game.utils;
    document.addEventListener("DOMContentLoaded", function () {
        document.getElementById('start-btn').addEventListener('click', function () {
            document.getElementById('canvas').classList.add('active');
            document.getElementsByClassName('score')[0].classList.add('active');
            this.classList.add('hidden');
            game.init();

        });
        // document.getElementById('restart-btn').addEventListener('click', function () {
        //     game.reset();
        //     document.getElementsByClassName('popup__overlay')[0].classList.remove('active');
        // });
        document.getElementsByClassName('popup__overlay')[0].addEventListener('click', function (event) {
            if (event.target.id == 'restart-btn') {
                game.reset();
                document.getElementsByClassName('popup__overlay')[0].classList.remove('active');
            }
        });
    });
})(Game || {});

var Game = (function (game) {
    var events = game.events;
    var gameStat = {};
    var scoreElement = document.getElementsByClassName('score')[0];

    init();

    function shooting() {
        gameStat.shoots++;
        gameStat.percentOfHits = (gameStat.hitting / gameStat.shoots * 100).toFixed();
        scoreElement.innerHTML = getTemplate();
    }

    function hitting() {
        gameStat.hitting++;
        gameStat.percentOfHits = (gameStat.hitting / gameStat.shoots * 100).toFixed();
        scoreElement.innerHTML = getTemplate();
        if (gameStat.hitting === game.options.botsCount) {
            events.publish('win');
        }
    }

    function getTemplate() {
        return '<span>shoots: ' + gameStat.shoots + '</span>'
            + '<span>hitting: ' + gameStat.hitting + '</span>'
            + '<span>percent of hits: ' + gameStat.percentOfHits + '%</span>';
    }

    function init() {
        gameStat.shoots = 0;
        gameStat.hitting = 0;
        gameStat.percentOfHits = 0;
        scoreElement.innerHTML = getTemplate();
    }

    // Events
    events.on('shoot', shooting);
    events.on('hit', hitting);
    events.on('gameOver', init);
    events.on('nextLevel', init);
})(Game);
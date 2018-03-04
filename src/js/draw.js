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
        if (game.units.length) {
            unitsActions.initBots();
            game.localUser = new game.Tank(false, options.tanksSpeed, options.localUnitEnterCoords.dx,
                options.localUnitEnterCoords.dy, true, false, options.direction.up, 21);
            game.units.push(game.Eagle);
            game.units.push(game.localUser);
        }
        unitsActions.initBots()
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
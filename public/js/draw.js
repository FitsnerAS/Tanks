var Game = (function (game) {
    var options = game.options;
    var map = game.map;
    var keys = game.keys;
    var mapSprite = new game.Sprite('img/terrain.png');
    var tankSprite = new game.Sprite('img/tiles.png');
    var tank = new game.Tank(false, 4, 32, 32);

    function drawGame() {
        mapSprite.clearRect();
        drawMap();
        drawTank();
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
        mapSprite.drawImg(
            (tile % options.spriteColumns) * map.tileSize,
            Math.floor(tile / options.spriteColumns) * map.tileSize,
            map.tileSize, map.tileSize,
            x, y, map.tileSize, map.tileSize);
    }

    function drawTank() {
        moveUnit(tank);
        tankSprite.drawImg(
            (tank.tile % tank.spriteColumns) * tank.tankSize,
            Math.floor(tank.tile / tank.spriteColumns) * tank.tankSize,
            tank.tankSize, tank.tankSize,
            tank.dx, tank.dy, tank.tankSize, tank.tankSize);
    }

    function moveUnit(unit) {
        if (keys.up) {
            unit.move('up', map.isNextPositionAvailable.bind(map));
            return;
        }
        if (keys.right) {
            unit.move('right', map.isNextPositionAvailable.bind(map));
            return;
        }
        if (keys.down) {
            unit.move('down', map.isNextPositionAvailable.bind(map));
            return;
        }
        if (keys.left) {
            unit.move('left', map.isNextPositionAvailable.bind(map));
            return;
        }
    }

    game.drawGame = drawGame;
    return game;
})(Game || {});
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



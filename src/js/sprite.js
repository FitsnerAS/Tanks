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


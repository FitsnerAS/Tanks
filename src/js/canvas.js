var Game = (function (game) {
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext("2d");
        game.canvas = {
                canvas: canvas,
                context: context
        };

        return game;
})(Game || {});
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


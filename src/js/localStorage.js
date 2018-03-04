var Game = (function (game) {
    var store = {};
    store.set = function (key, value) {
        window.localStorage[key] = value;
    };
    store.get = function (key) {
        return window.localStorage[key] || false;
    };
    store.setObject = function (key, value) {
        window.localStorage[key] = JSON.stringify(value);
    };
    store.getObject = function (key) {
        if (window.localStorage[key] != undefined)
            return JSON.parse(window.localStorage[key] || false);
        return false;
    };
    store.remove = function (key) {
        window.localStorage.removeItem(key);
    };
    store.clear = function () {
        window.localStorage.clear();
    };

    game.store = store;
    return game;
})(Game);
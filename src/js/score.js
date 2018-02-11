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
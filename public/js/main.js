(function () {
    var drawGameFunction = Game.drawGame;
    document.addEventListener("DOMContentLoaded", function () {
        document.getElementsByClassName('start-btn')[0].addEventListener('click', function () {
            document.getElementById('canvas').classList.add('active');
            this.classList.add('hidden');
            setInterval(drawGameFunction, 24);
        });
    });
})();

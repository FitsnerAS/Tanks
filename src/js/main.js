(function (game) {
    document.addEventListener("DOMContentLoaded", function () {
        document.getElementById('start-btn').addEventListener('click', function () {
            document.getElementById('canvas').classList.add('active');
            document.getElementsByClassName('score')[0].classList.add('active');
            this.classList.add('hidden');
            game.init();

        });
        document.getElementById('restart-btn').addEventListener('click', function () {
            game.reset();
            document.getElementsByClassName('popup__overlay')[0].classList.remove('active');
        });

    });
})(Game || {});

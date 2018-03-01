(function (game) {
    var utils = game.utils;
    document.addEventListener("DOMContentLoaded", function () {
        document.getElementById('start-btn').addEventListener('click', function () {
            document.getElementById('canvas').classList.add('active');
            document.getElementsByClassName('score')[0].classList.add('active');
            this.classList.add('hidden');
            game.init();

        });
        // document.getElementById('restart-btn').addEventListener('click', function () {
        //     game.reset();
        //     document.getElementsByClassName('popup__overlay')[0].classList.remove('active');
        // });
        document.getElementsByClassName('popup__overlay')[0].addEventListener('click', function (event) {
            if (event.target.id == 'restart-btn') {
                game.reset();
                document.getElementsByClassName('popup__overlay')[0].classList.remove('active');
            }
        });
    });
})(Game || {});

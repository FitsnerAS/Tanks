(function (game) {
    document.addEventListener("DOMContentLoaded", function () {
        var utils = game.utils;
        var store = game.store;
        var _strBtn = document.getElementById('start-btn');

        function saveTemplate() {
            var savesArr = store.getObject('names');
            if (!savesArr){
                return '';
            }
            var txt = '<div id="save-wrapper">';
            savesArr&& savesArr.forEach(function (save) {
                txt += '<p class="save-game-span">' + save + '</p>';
            });
            txt += '</div>';
            return txt;
        }

        _strBtn.insertAdjacentHTML('afterEnd', saveTemplate());
        _strBtn.addEventListener('click', function () {
            document.getElementById('canvas').classList.add('active');
            document.getElementsByClassName('score')[0].classList.add('active');
            this.classList.add('hidden');
            game.init();
            document.getElementById('save-wrapper').classList.add('hidden');
        });
        document.getElementsByClassName('popup__overlay')[0].addEventListener('click', function (event) {
            if (event.target.id == 'restart-btn') {
                game.reset();
                document.getElementsByClassName('popup__overlay')[0].classList.remove('active', 'white');
                document.getElementsByClassName('popup')[0].classList.remove('game-over');
            }
        });
        document.getElementById('save-wrapper').addEventListener('click', function () {
            if(event.target.classList.contains('save-game-span')){
                var name = event.target.innerText;
                var gameSave = store.getObject(name);
                game.units = gameSave.units;
                game.currentLevel = gameSave.level;
                game.gameStat = gameSave.gameStat;
                game.init(game.currentLevel);
                this.classList.add('hidden');
                _strBtn.classList.add('hidden');
            }
        });
        document.getElementById('reset-btn').addEventListener('click', function () {
            store.clear();
            document.getElementsByClassName('action-wrapper')[0].removeChild(document.getElementById('save-wrapper'));
        });
    });
})(Game || {});

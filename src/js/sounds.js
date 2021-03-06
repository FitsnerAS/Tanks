var Game = (function (game) {

    function Sound(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.volume = 0.05;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
        this.play = function () {
            this.sound.currentTime = 0;
            this.sound.play();
        };
        this.playAlways = function() {
            this.sound.play();
        };
        this.stop = function () {
            this.sound.pause();
        };
    }
    game.Sound = Sound;
    return game;
})(Game || {});
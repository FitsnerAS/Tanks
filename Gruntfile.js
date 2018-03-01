module.exports = function (grunt) {
    grunt.initConfig({
        concat: {
            js: {
                src: ['src/js/PubSub.js', 'src/js/options.js', 'src/js/utils.js', 'src/js/canvas.js', 'src/js/keyboard.js',
                    'src/js/sprite.js', 'src/js/map.js', 'src/js/collision.js', 'src/js/sounds.js', 'src/js/tank.js', 'src/js/bullet.js',
                    'src/js/unitActions.js', 'src/js/draw.js', 'src/js/main.js', 'src/js/score.js'
                ],
                dest: 'dist/bundle.js'
            },
            css: {
                src: ['src/css/main.css'],
                dest: 'dist/bundle.css'
            }
        },
        watch: {
            js: {
                files: ['**/*.js'],
                tasks: ['concat']
            },
            css: {
                files: ['**/*.css'],
                tasks: ['concat']
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
};
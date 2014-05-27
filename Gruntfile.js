module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    less: {
      development: {
        files: {
          "src/tagged.css": "src/tagged.less"
        }
      },
    },

    watch: {
      less : {
        files : 'src/*.less',
        tasks : ['less:development'],
        options : {
          livereload : true
        }
      },
      scripts : {
        files : 'src/*.js',
        options : {
          livereload : true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

};

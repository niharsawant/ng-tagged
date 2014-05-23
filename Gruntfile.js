module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      scripts : {
        files : 'src/**/*.js',
        options : {
          livereload : true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');

}

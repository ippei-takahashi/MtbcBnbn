module.exports = function(grunt) {

  'use strict';

  grunt.initConfig({

    jst: {
      compile: {
        options: {
          templateSettings: {
            interpolate: /\{\{(.+?)\}\}/g
          },
          processName: function(filename) {
            return filename.replace(/(public\/templates\/|.html)/g, '');
          }
        },
        files: {
          'public/js/jst/template.js': [
          ]
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jst');

};
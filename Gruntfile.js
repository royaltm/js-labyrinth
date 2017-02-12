"use strict";

var buble = require('rollup-plugin-buble');

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      scripts: {
        files: ['src/*.js', 'src/**/*.js', 'Gruntfile.js'],
        tasks: ['default'],

        options: {
          spawn: false,
        },
      },
    },

    rollup: {
      public: {
        options: {
          format: 'cjs',
          plugins: function() {
            return [
              buble(),
            ];
          }
        },
        files: {
          'lib/index.js': ['src/index.js']
        },
      }
    },
  });

  grunt.registerTask('default', [
    'rollup'
  ]);
};

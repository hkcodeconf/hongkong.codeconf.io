module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // from scss to css
    sass: {
      dist: {
        options: {
          // style: 'compact'
          style: 'compressed'
        },
        files: {
          'css/style.css': 'css/style.scss'
        }
      }
    },

  // watch files so it gets compiled
  watch: {
    css: {
      files: ['gruntfile.js','css/*.scss','js/*.js'],
      // tasks: ['sass:build'],
      tasks: ['sass:dist','postcss'], // for postcss - autoprefixer
    },
  },

  postcss: {
    options: {
      map: {
        inline: false,
        annotation: 'css/'
      },

      processors: [
        require('autoprefixer-core')({browsers: 'last 4 versions, ie >= 9'}),
      ]
    },
    dist: {
      src: 'css/*.css'
    }
  },
});


grunt.registerTask('default', ['sass','postcss','watch']);
//   grunt.registerTask('watch', ['watch']);
};

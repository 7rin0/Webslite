module.exports = function(grunt) {

  grunt.initConfig({
    dir: "unpacked",

    jshint: {
      files: ['Gruntfile.js', '<%= dir %>/src/js/in.js', '<%= dir %>/src/js/out.js', '<%= dir %>/src/js/background.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    uglify: {
      min: {
        files: {
          '<%= dir %>/src/min/js/in.min.js': ['<%= dir %>/src/js/in.js'],
          '<%= dir %>/src/min/js/out.min.js': ['<%= dir %>/src/js/out.js'],
          '<%= dir %>/src/min/js/background.min.js': ['<%= dir %>/src/js/background.js']
        }
      }
    },
    cssmin: {
      min: {
        files: {
          '<%= dir %>/src/min/css/main.min.css': ['<%= dir %>/src/css/main.css']
        }
      }
    },
    imagemin: {
       dist: {
          options: {
            optimizationLevel: 5
          },
          files: [{
             expand: true,
             cwd: '<%= dir %>/src/images',
             src: ['**/*.{png,jpg,gif,ico}'],
             dest: '<%= dir %>/src/min/images'
          }]
       }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Register tasks
  grunt.registerTask('default', ['jshint', 'uglify', 'cssmin', 'watch']);

};

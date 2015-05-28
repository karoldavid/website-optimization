
module.exports = function(grunt) {

  grunt.initConfig({
    watch: {
          options: {
            livereload: true,
          },
         js: {
            files: ['js/*.js', 'views/js/*.js'],
            tasks: ['jshint'],
            options: {
              'tag-pair': true,
            }
        },
        html: {
            files: ['index.html', 'views/pizza.html'],
            tasks: ['htmlhint'],
            options: {
              'tag-pair': true,
            }
        },
        scripts: {
            files: ['js/*.js', 'views/js/*.js'],
            tasks: ['concat', 'uglify'],
            options: {
              spawn: false,
            }
        },
        styles: {
            files: ['css/*.css', 'views/css/*.css'],
            tasks: ['concat', 'cssmin'],
            options: {
            spawn: false,
          }
        },
        images: {
            files: ['img_src/portfolio/*.*', 'img_src/views/dynamic', 'img_src/views/static/*.*'],
            tasks: ['responsive_images', 'imagemin'],
            options: {
            spawn: false,
          },
        }  
    },
     // configure jshint to validate js files -----------------------------------
    jshint --verbose: {
      options: {
        reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
      },
      // when this task is run, lint the Gruntfile and all js files in src
      build: ['Gruntfile.js', 'views/js/*.js']
    },
    htmlhint: {
        html1: {
          options: {
            'tag-pair': true
        },
        src: ['*.html']
      },
      html2: {
          options: {
            'tag-pair': true
        },
        src: ['views/*.html']
      }
    },
    responsive_images: {
      devportfolio: {
        options: {
          engine: 'im',
          sizes: [{
            width: '200',
            suffix: '_large_2x',
            quality: 30
          },{
            width: '100',
            suffix: '_large_1x',
            quality: 60
          }]
        },
        files: [{
          expand: true,
          src: ['*.{gif,jpg,png}'],
          cwd: 'img_src/portfolio',
          dest: 'img'
        }]
      },
      devdynamic1: {
        options: {
          engine: 'im',
          sizes: [{
            width: '200',
            suffix: '',
            quality: 60
          }]
        },
        files: [{
          expand: true,
          src: ['*.{gif,jpg,png}'],
          cwd: 'img_src/views/dynamic',
          dest: 'views/images'
        }]
      },
      devdynamic2: {
        options: {
          engine: 'im',
          sizes: [{
            height: '100',
            suffix: '',
            quality: 60
          }]
        },
        files: [{
          expand: true,
          src: ['*.{gif,jpg,png}'],
          cwd: 'img_src/views/dynamic',
          dest: 'views/images'
        }]
      },
      devstatic: {
        options: {
          engine: 'im',
          sizes: [{
            width: '720',
            suffix: '_large_2x',
            quality: 30
          },{
            width: '360',
            suffix: '_large_1x',
            quality: 60
          }]
        },
        files: [{
          expand: true,
          src: ['*.{gif,jpg,png}'],
          cwd: 'img_src/views/static',
          dest: 'views/images'
        }]
      }
    },
    imagemin: {
    dynamic1: {
      files: [{
        expand: true,
        cwd: 'img',
        src: ['**/*.{png,jpg,gif}'],
        dest: 'img'
      }]
    },
    dynamic2: {
      files: [{
        expand: true,
        cwd: 'views/images',
        src: ['**/*.{png,jpg,gif}'],
        dest: 'views/images'
      }]
    }
  },
    concat: {
    jsportfolio: {
        src: [
               'js/jquery-1.11.3.js',
               'js/classie.js',
               'js/perfmatters.js'
             ],
        dest: 'js/build/production.js'
      },
    jspizza: {
        src:  'views/js/*.js',
        dest: 'views/js/build/production.js'
      },
    cssportfolio: {
        src: [
               'fonts/stylesheet.css',
               'icons/css/font-awesome.css',
               'css/*.css'
             ],
        dest: 'css/build/concat.css'
      },
    csspizza: {
        src: [
               'views/css/*.css',
             ],
        dest: 'views/css/build/concat.css'
      }
    },
    uglify: {
    buildportfolio: {
        src: 'js/build/production.js',
        dest: 'js/build/production.min.js'
    },
    buildpizza: {
       src: 'views/js/build/production.js',
       dest: 'views/js/build/production.min.js'
    },
  },
  cssmin: {
  cssportfolio:{
    src: 'css/build/concat.css',
    dest: 'css/build/concat.min.css'
  },
  cssminpizza:{
     src: 'views/css/build/concat.css',
     dest: 'views/css/build/concat.min.css'
   }
}
});
  
  // grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-htmlhint');
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-css');

  // Default task.
  grunt.registerTask('default', [ 'watch', 'jshint', 'htmlhint', 'responsive_images', 'imagemin', 'concat', 'uglify', 'cssmin']);

};
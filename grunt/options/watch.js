module.exports = {
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
};
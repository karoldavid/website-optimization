module.exports = {
    options: {
      separator: ';',
    },
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
};
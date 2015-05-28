module.exports = function (grunt) {
  grunt.registerTask('default', ['jshint', 'htmlhint', 'concat', 'uglify', 'cssmin', 'responsive_images', 'imagemin']);

  // grunt.registerTask('dev', ['uglify:dev']);
  // grunt.registerTask('production', ['jshint:production', 'htmlhint:production']);
};

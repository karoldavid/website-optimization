module.exports = {
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
};
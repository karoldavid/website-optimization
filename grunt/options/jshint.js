module.exports = {
  options: {
        reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
  },
      // when this task is run, lint the Gruntfile and all js files in src
        build: ['views/js/*.js']
};
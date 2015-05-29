module.exports = {
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
};
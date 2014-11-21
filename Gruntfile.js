module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    nodewebkit: {
      options: {
        version: '0.11.0',
        buildDir: './dist',
        platforms: ['osx', 'win'],
        appName: 'NW Demo',
        appVersion: '0.0.1'
      },
      src: ['./app/**']
    },
    copy: {
      main: {
        files: [{
          src: 'libraries/mac/ffmpegsumo.so',
          dest: 'dist/NW Demo/osx/NW Demo.app/Contents/Frameworks/node-webkit Framework.framework/Libraries/ffmpegsumo.so',
          flatten: true
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-node-webkit-builder');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.registerTask('default', ['nodewebkit', 'copy']);
};

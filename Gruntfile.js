module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    nodewebkit: {
      options: {
        version: '0.10.3',
        buildDir: './dist',
        platforms: ['osx'],
        appName: 'NW Demo',
        appVersion: '0.0.1'
      },
      src: ['./app/**']
    }
  });

  grunt.loadNpmTasks('grunt-node-webkit-builder');
  grunt.registerTask('default', ['nodewebkit']);
};

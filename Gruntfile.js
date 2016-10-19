
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    postcss: {
        options: {
        /*  map: true, // inline sourcemaps

          // or
          map: {
              inline: false, // save all sourcemaps as separate files...
              annotation: 'dist/css/maps/' // ...to the specified directory
          },*/

          processors: [
            //require('pixrem')(), // add fallbacks for rem units
            require('postcss-import')(),
            require('postcss-cssnext')({browsers: 'last 2 versions'}), // add vendor prefixes
            //require('autoprefixer')({browsers: ['last 2 versions']}),
            require('postcss-font-magician')(),
            require('cssnano')({ autoprefixer: false }) // minify the result
          ]
        },
        dist: {
          src: '<%= src %>',//'_css/main.css',//'css/*.css'
          dest: '<%= dst %>'//'_includes/css/style.css'//'./css'
        }
      }
  });

  // Load the plugin that provides the "uglify" task.
  //grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-postcss');

  // Default task(s).
  grunt.registerTask('__postcss', ['postcss']);

  grunt.registerTask('default', 'Default Grunt Task', function() {

     var target = grunt.option('target');

     grunt.log.write('Processing task: ');


    if (target === undefined) {

       grunt.log.write('Main CSS build.');
       grunt.config.set('src', '_css/main.css');
       grunt.config.set('dst', '_includes/css/style.css');

    } else if (target === "404") {
       grunt.log.write('404 CSS build.');
       grunt.config.set('src', '_css/404.css');
       grunt.config.set('dst', '_includes/css/style404.css');
    }

       var task = grunt.config.get('postcss');

      grunt.log.writeln(' Output: ' + task.dist.dest);
      grunt.task.run('__postcss');

  });

};

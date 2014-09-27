// Generated on 2013-12-23 using generator-webapp 0.2.6
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);
	
  // Configurable paths for the application
  var appConfig = {
    src: 'src', // TODO When implementing bower, change to: require('./bower.json').srcPath || 'src'
    dist: 'dist'
  };
  
  grunt.initConfig({
		
		// Project settings
		conf: appConfig,
		
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= conf.src %>/img',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= conf.dist %>/img'
        },
				{
          expand: true,
          cwd: '<%= conf.src %>/logo',
          src: '*.{png,jpg,jpeg}',
          dest: '<%= conf.dist %>/logo'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= conf.src %>/img',
          src: '{,*/}*.svg',
          dest: '<%= conf.dist %>/img'
        }]
      }
    },
    less : {
      all: {
        options: {
          paths: 'css/',
          compress: true
        },
        files: {
          '<%= conf.dist %>/css/custom.css': 'css/custom.less'
        }
      }
    },
    copy: {
      data: {
        files: [
          {
            expand: true,
            src: 'import/points/*',
            dest: '<%= conf.dist %>/points/'
          },
          {
            expand: true,
            src: 'import/topics/*',
            dest: '<%= conf.dist %>/topics/'
          },
          {
            expand: true,
            src: 'import/services/*',
            dest: '<%= conf.dist %>/services/'
          },
          {
            expand: true,
            src: 'import/cases/*',
            dest: '<%= conf.dist %>/cases/'
          },
          {
            expand: true,
            src: 'import/posts/*',
            dest: '<%= conf.dist %>/posts/'
          },
          {
            expand: true,
            src: 'import/index/*',
            dest: '<%= conf.dist %>/index/'
          }
        ]
      },
			assets: {
				files: [
					{
						expand: true,
						cwd: '<%= conf.src %>',
						src: 'js/*',
            dest: '<%= conf.dist %>'
					},
					{
						expand: true,
						cwd: '<%= conf.src %>',
						src: 'css/*',
            dest: '<%= conf.dist %>'
					},
					{
						expand: true,
						cwd: '<%= conf.src %>',
						src: '1901/*',
            dest: '<%= conf.dist %>'
					},
					{
						expand: true,
						cwd: '<%= conf.src %>',
						src: ['bootstrap/{,*/}*',
								  '!bootstrap/docs'],
            dest: '<%= conf.dist %>'
					},
					{
						expand: true,
						cwd: '<%= conf.src %>',
						src: ['*.html',
								  '!index.html', // index.html and get-involved.html are generated by the renderPages task
								  '!get-involved.html'],
            dest: '<%= conf.dist %>'
					},
					{
						expand: true,
						cwd: '<%= conf.src %>',
						src: 'README.md',
            dest: '<%= conf.dist %>'
					}
				]
			}
    },
    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= conf.dist %>/{,*/}*',
            '!<%= conf.dist %>/.git*'
          ]
        }]
      }
    },
    concurrent: {
      fix: [
        'fixpoints',
        'fixservices',
        'fixtopics'
      ],
      minify: [
        'less',
        'imagemin',
        'svgmin'
      ]
    }
  });

  // Load the scripts from the build directory
  grunt.loadTasks('build');
  
  grunt.registerTask('render', ['concurrent:fix', 'buildIndexes', 'prettify', 'copy:data', 'copy:assets', 'generateApiFiles', 'renderPages']);
    
  grunt.registerTask('build', [
		'clean:dist',
    'render',
    'concurrent:minify'
  ]);
  
  grunt.registerTask('default', [
    'build'
  ]);
};
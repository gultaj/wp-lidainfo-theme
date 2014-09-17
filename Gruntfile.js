var lrserver = require('tiny-lr')();
lrserver.listen(9001, function(err) { console.log('LR Server Started'); });
lrserver.changed({body:{}});

module.exports = function(grunt) {
	grunt.initConfig({
		compass: {
			dist: {
				options: {
					config: 'config.rb'
				}
			}
		},
		connect: {
			server: {
				options: {
					port: 9000,
					base: 'src/',
					hostname: "localhost",
					livereload: true,
					open: true
				}
			}
		},
		watch: {
			sass: {
				files: ['src/sass/**/*.sass'],
				tasks: ['compass']
			},
			livereload: {
				files: ['src/css/*.css', 'src/*.html'],
				options: {
					livereload: true,
					debounceDelay: 250
				}
			}
		},
		copy: {
			main: {
				files: [
					{expand: true, src: ['**/*.{css,html}'], cwd: 'src', dest: 'production', filter: 'isFile'},
					{expand: true, src: ['**/img/*'], cwd: 'src', dest: 'production', filter: 'isFile'}
				]
			}
		},
		clean: ['production/**/*'],
		cssmin: {
			build: {
				files: [
					{expand: true, src: ['*.css', '!*.min.css'], cwd: 'production/css/', dest: 'production/css/', ext: '.min.css'}
				]
			}
		}
	});

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.registerTask('default', ['compass', 'connect', 'watch']);
	grunt.registerTask('build', ['clean', 'copy', 'cssmin']);
};
var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');

gulp.task('less', function () {
  gulp.src('./app/less/main.less')
    .pipe( less() )
    .pipe( gulp.dest('./css') );
});

gulp.task('js', function() {
	gulp.src('./app/js/main.js')
		.pipe( gulp.dest('./js') );
})

gulp.task('watch', function () {
	var server = livereload();

    gulp.watch('./app/less/**/*.less', ['less']).on('change', function(file){
    	server.changed(file.path);
    });

    gulp.watch('./app/js/**/*.js', ['js']).on('change', function(file){
    	server.changed(file.path);
    });
});

gulp.task('default', ['less', 'js', 'watch']);

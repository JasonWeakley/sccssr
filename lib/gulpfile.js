var gulp = require('gulp');
var jshint = require('gulp-jshint');
var watch = require('gulp-watch');
var sass = require('gulp-sass');

gulp.task('default', ['sassify', 'watch']); // put this back in 'lint'

gulp.task('sassify', function() {
	return gulp.src('../sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('../styles'));
});

gulp.task('watch', function() {
	// gulp.watch('../app/**/*.js', ['lint']);
	gulp.watch('../sass/**/*.scss', ['sassify']);
});

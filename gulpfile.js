var gulp = require('gulp');
var browserSync = require('browser-sync');
var bs = browserSync.create();

// Inits browserSync server
gulp.task('browserSync', function(){
	bs.init({
		server: "./"
	});
});

// Watch files changes
gulp.task('watch', function(){
	gulp.watch('./*.html').on('change', bs.reload);
	gulp.watch('./js/*.js').on('change', bs.reload);
	gulp.watch('./css/*.css').on('change', bs.reload);
});

gulp.task('default', 
	gulp.parallel('browserSync', 'watch'));


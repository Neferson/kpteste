"use-strict"

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

var resourcePath = './resources/assets/';

gulp.task('scripts', function() {
	return gulp.src([
			// "./node_modules/gentelella/vendors/jquery/dist/jquery.js",
			"./node_modules/jquery-confirm/js//jquery-confirm.js",
			"./node_modules/gentelella/vendors/moment/moment.js",		
			"./node_modules/bootstrap-sass/assets/javascripts/bootstrap.js",
			"./node_modules/gentelella/vendors/iCheck/icheck.js",
			"./node_modules/gentelella/vendors/dropzone/dist/dropzone.js",
			"./node_modules/gentelella/vendors/pnotify/dist/pnotify.js",
			"./node_modules/gentelella/vendors/bootstrap-wysiwyg/src/bootstrap-wysiwyg.js",
			"./node_modules/gentelella/vendors/jquery.hotkeys/jquery.hotkeys.js",
			"./node_modules/gentelella/src/js/custom.js",
			"./node_modules/jquery-toast-plugin/src/jquery.toast.js",
			"./node_modules/gentelella/vendors/morris.js/morris.js",
			"./node_modules/gentelella/vendors/nprogress/nprogress.js",
			"./node_modules/gentelella/vendors/bootstrap-daterangepicker/daterangepicker.js",
			resourcePath + "app/js/jquery.mask.js",
			resourcePath + "app/js/custom.js",
	])
	.pipe(concat('app.js'))
	.pipe(gulp.dest('./public/js'));
})

gulp.task('sass', function() {
	return gulp.src( resourcePath + 'app/sass/**/*scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('./public/css'));
})

gulp.task('watch', function() {
	gulp.watch( resourcePath + 'app/js/**/*.js', ['scripts'])
	gulp.watch(resourcePath + 'app/sass/**/*.scss', ['sass'])
})

gulp.task('default', ['watch', 'scripts', 'sass']);
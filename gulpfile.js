var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var debug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var fileinclude = require('gulp-file-include');
var browserSync = require('browser-sync').create();

var html_src_all = 'src/template/**/*.html';
var html_src = 'src/template/*.html';
var html_dest = './dist';

var css_src = 'src/scss/**/*.scss';
var css_dest = './dist/assets/css';

var js_src = 'src/js/**/*.js';
var js_dist = './dist/assets/js';

gulp.task('fileinclude', function() {
  return gulp.src(html_src)
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      context: {
        name: 'test'
      }
    }))
    .pipe(gulp.dest(html_dest))
    .pipe(browserSync.stream());
});

gulp.task('styles', function () {
	return gulp.src( css_src)
		.pipe(sass().on('error',sass.logError))
		.pipe(autoprefixer('last 20 versions'))
		.pipe(minifyCSS())
		.pipe(gulp.dest(css_dest))
		.pipe(browserSync.stream());
});

gulp.task('scripts', function () {
	return gulp.src(js_src)
		.pipe(concat('scripts.js'))
		// .pipe(debug())
		.pipe(uglify())
		.pipe(gulp.dest(js_dist))
		.pipe(browserSync.stream());
});

// use 'gulp watch' command, if you don't need livereload
gulp.task('watch', function(){
	gulp.watch(html_src, gulp.parallel('fileinclude'));
	gulp.watch(css_src, gulp.parallel('styles'));
	gulp.watch(js_src, gulp.parallel('scripts'));

});

gulp.task('default', function() {
	browserSync.watch(html_src_all, gulp.parallel('fileinclude'), function (event, file) {		
		if (event === "change") {
				browserSync.reload("*.html");
		}
	});

	browserSync.watch(css_src, gulp.parallel('styles'), function (event, file) {
		if (event === "change") {
				browserSync.reload("*.css");
		}
	});
	browserSync.watch(js_src, gulp.parallel('scripts'), function (event, file) {
		if (event === "change") {
				browserSync.reload("*.js");
		}
	});

	browserSync.init({
		server: {
				baseDir: "./dist"
		}
	});
});

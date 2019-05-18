var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var debug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sass = require('gulp-sass');

var css_src = 'src/scss/**/*.scss';
var css_dest = 'assets/css';

var js_src = 'src/js/**/*.js';
var js_dist = 'assets/js';

gulp.task('styles', function () {
    return gulp.src( css_src)
        .pipe(sass().on('error',sass.logError))
        .pipe(autoprefixer('last 20 versions'))
        .pipe(minifyCSS())
        .pipe(gulp.dest(css_dest));
});

gulp.task('scripts', function () {
    return gulp.src(js_src)
        .pipe(concat('scripts.js'))
         .pipe(debug())
        .pipe(uglify())
        .pipe(gulp.dest(js_dist));
});

gulp.task('watch', function(){
    gulp.watch(css_src, gulp.parallel('styles'));
    gulp.watch(js_src, gulp.parallel('scripts'));
});
var	gulp = require('gulp'),
  	sass = require('gulp-sass'),
  	autoprefixer = require('gulp-autoprefixer'),
  	rename = require('gulp-rename'),
  	cssmin = require('gulp-cssmin'),
  	watch = require('gulp-watch'),
  	browserSync	= require('browser-sync'),
  	imagemin = require('gulp-imagemin'),
  	pngcrush = require('imagemin-pngcrush'),
  	jpegtran = require('imagemin-jpegtran');

gulp.task('browser-sync', function() {
	browserSync.init(["./css/*.css", "./*.html"], {
    	server: {
        	baseDir: "./"
		}
	});
});

gulp.task('images', function () {
	return gulp.src('img/*')
		.pipe(imagemin({
			svgoPlugins: [{removeViewBox: false}],
			use: [pngcrush(), jpegtran()]
		}))
	.pipe(gulp.dest('./img'));
});

gulp.task('sass', function() {
	gulp.src('./scss/pm.scss')
		.pipe(sass())
		.pipe(autoprefixer("last 2 version", "ie 9"))
    .pipe(gulp.dest('./css'))
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./css'))
});

gulp.task('default', ['sass', 'browser-sync'], function () {
	gulp.watch("./scss/*.scss", ['sass']);
});

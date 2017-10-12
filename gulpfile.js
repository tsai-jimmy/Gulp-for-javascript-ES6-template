"use strict";
var gulp = require('gulp'),
    path = require('path'),
    fs = require("fs"),
    concat = require('gulp-concat'),
    changed = require('gulp-changed'),
    rename = require("gulp-rename"),
    sass = require('gulp-sass'),
    notify = require("gulp-notify"),
    connect = require('gulp-connect'),
    livereload = require('gulp-livereload'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    source = require('vinyl-source-stream'),    
    gutil = require('gulp-util'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    watchify = require('watchify')

/* Server無法重新整理時改 port 試試看 */
gulp.task('connect',()=>{
	connect.server({
		root: './',
		port: 3000,
		livereload: true
	});
});

/* js */
gulp.task('js', function() {
	 browserify({ debug: true })
         .transform(babelify, {
            presets: ["env", "stage-2"],
            plugins: [
                "babel-plugin-transform-class-properties",
                "transform-async-to-generator"
            ]
         })
		.require('js/es6/app.js', { entry: true })
		.bundle()
        .on('error', gutil.log)
        .pipe(source('app.js')) 
        .pipe(gulp.dest('js'))
});

 
/*Sass*/
gulp.task('sass',()=> {
	return gulp.src('sass/**/*.scss')
	.pipe(sass.sync().on('error', sass.logError))
	.pipe(autoprefixer({
		browsers: ['> 1%', 'last 5 versions', 'Firefox >= 45', 'iOS >=8', 'Safari >=8','ie >= 10'],
		cascade: false
	}))
	.pipe(sass({outputStyle: 'compressed'}))
	.pipe(gulp.dest('css/'))
	.pipe(connect.reload())
});

/*Images*/
gulp.task('images', ()=>{
    let src = 'images-src/**/*.{jpg,png,gif,ico}';
    let tar = 'images';
    const imagemin = require('gulp-imagemin');
    return gulp.src(src)
    .pipe(changed(tar))
    .pipe(imagemin([
        require('imagemin-pngquant')(),
        require('imagemin-jpegtran')({quality:70}),
        require('imagemin-gifsicle')({optimizationLevel:2}),
    ]))
    .pipe(gulp.dest(tar));
});



/*Watch*/
gulp.task('watch',()=> {
    gulp.watch('sass/**/*.scss', ['sass']);
    gulp.watch('images/**/*.{jpg,png,gif,ico}', ['images']);
    gulp.watch('js/es6/**/*.js', ['js']);
});


gulp.task('default', ['connect', 'js', 'sass', 'images' , 'watch']);

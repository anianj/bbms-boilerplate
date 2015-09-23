/**
 * Created by anianj on 9/21/15.
 */

var gulp        = require('gulp'),
    browserify  = require('browserify'),
    jade        = require('gulp-jade'),
    sass        = require('gulp-sass'),
    sourcemaps  = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create();



gulp.task("jade", function(){
    return gulp.src(['./src/page/*.jade'])
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest('./build/'));
});


gulp.task("lib", function(){
    return gulp.src(['./src/assets/lib/**'])
        .pipe(gulp.dest('./build/assets/lib'));
});


gulp.task("image", function(){
    return gulp.src(['./src/assets/img/**'])
        .pipe(gulp.dest('./build/assets/img'));
});

gulp.task("style", function(){
    return gulp.src(['./src/assets/style/default.sass'])
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/assets/style/'));
});

gulp.task("bundle",function(){
    var entryBasePath = "./src/module/entry/";

    browserify([
        entryBasePath + 'index.js'
    ],{
       debug:true
    })

});


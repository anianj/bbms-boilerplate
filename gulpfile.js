/**
 * Created by anianj on 9/21/15.
 */

var gulp        = require('gulp'),
    browserify  = require('browserify'),
    jade        = require('gulp-jade'),
    sass        = require('gulp-sass'),
    sourcemaps  = require('gulp-sourcemaps'),
    source = require('vinyl-source-stream'),
    plumber = require('gulp-plumber'),
    sassify = require('sassify'),
    browserSync = require('browser-sync').create();



gulp.task("jade", function(){
    return gulp.src(['./src/page/*.jade'])
        .pipe(plumber())
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
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({"includePaths":"./node_modules/compass-mixins/lib"}))
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
    .transform(sassify, {
        'auto-inject': true, // Inject css directly in the code
        base64Encode: true, // Use base64 to inject css
        sourceMap: true // Add source map to the code
    })
    .bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest('./build/bundle/'));

});


gulp.task("watch", function(){

    browserSync.init({
        files: "./build/**",
        reloadDelay: 3000,
        server: {
            baseDir: "./build",
            directory: true
        }
    });

    gulp.watch('./src/module/**/**', ['bundle']);
    gulp.watch('./src/assets/style/**/*.sass', ['style']);
    gulp.watch('./src/page/**/*.jade', ['jade']);
    gulp.watch('./src/assets/img/**', ['image']);
    gulp.watch('./src/assets/lib/**', ['lib']);

});

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('autoprefixer'),
    uglifycss = require('gulp-uglifycss'),
    uglifyjs = require('gulp-uglifyjs'),
    concat = require('gulp-concat'),
    bourbon = require('node-bourbon'),
    browserSync = require('browser-sync').create(),
    path = require("path"),
    html = require('gulp-processhtml'),
    watch = require('gulp-watch'),
    runs = require('run-sequence'),
    clean = require('gulp-clean'),
    injectPartials = require('gulp-file-include'),
    htmlmin = require('gulp-htmlmin');

 var targetDebug = "../assets-debug";

//ADD EVERY NEW JS OR CSS TO WATCH AUTOMATICALLY OVER GULP AFTER CHANGES IS SAVED FROM MASTER
var paths = {
    sass: [
        //VENDOR
        path.join(__dirname, 'bower_components/bootstrap/dist/css/bootstrap.min.css'),
        // path.join(__dirname, "sass/*bootstrap*/_bootstrap.scss"),

        //PLUGINS
        path.join(__dirname, "bower_components/jcf/dist/css/theme-minimal/jcf.css"),
        //path.join(__dirname, "bower_components/jcf/dist/css/demo.css"),
        path.join(__dirname, "bower_components/slick-carousel/slick/slick.css"),
        path.join(__dirname, "bower_components/slick-carousel/slick/slick-theme.css"),
        // FONT AWESOME CSS
        path.join(__dirname, "bower_components/font-awesome/css/font-awesome.css"),
        path.join(__dirname, "plugins/**/*.css"),

        //CUSTOM
        path.join(__dirname, 'sass/*.scss'),
        path.join(__dirname, 'sass/*pages*/*.scss')
    ],
    js: [
        //VENDOR
        path.join(__dirname, "bower_components/jquery/dist/jquery.min.js"),
        path.join(__dirname, "bower_components/bootstrap/dist/js/bootstrap.min.js"),

        //PLUGINS
        path.join(__dirname, "bower_components/jcf/dist/js/jcf.js"),
        path.join(__dirname, "bower_components/jcf/dist/js/jcf.radio.js"),
        path.join(__dirname, "bower_components/jcf/dist/js/jcf.checkbox.js"),
        path.join(__dirname, "bower_components/jcf/dist/js/jcf.select.js"),
        path.join(__dirname, "bower_components/slick-carousel/slick/slick.min.js"),

        path.join(__dirname, "plugins/**/*.js"),

        //APP
        path.join(__dirname, 'script/*.js'),
        path.join(__dirname, 'script/*Includes*/*.js')
    ]
}

// copy HTML task
gulp.task('html', function() {
    return gulp.src("../views/pages/*.html")
        //.pipe(html())
        .pipe(injectPartials({
            prefix: '@@',
            basepath: '@file'
        }))
        // .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('../'))
        .pipe(browserSync.stream())
});

// copy the sass file task
gulp.task('sassMainDbg', function() {
    return gulp.src([
            //VENDOR
            'bower_components/bootstrap/dist/css/bootstrap.min.css',
            //'sass/*bootstrap*/_bootstrap.scss',

            //PLUGINS
            'bower_components/jcf/dist/css/theme-minimal/jcf.css',
            //"bower_components/jcf/dist/css/demo.css,
            'bower_components/slick-carousel/slick/slick.css',
            'bower_components/slick-carousel/slick/slick-theme.css',
            // FONT AWESOME CSS
            'bower_components/font-awesome/css/font-awesome.css',
            'plugins/**/*.css',

            //CUSTOM
            'sass/*.scss'
        ])
        .pipe(sourcemaps.init())
        .pipe(concat('main.css'))
        .pipe(sass({
            // outputStyle: 'compressed',
            includePaths: bourbon.includePaths
        }).on('error', sass.logError))
        .pipe(postcss([autoprefixer({ browsers: ['> 0%'] })]))
        //.pipe(uglifycss())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(path.join(__dirname, '../assets-debug/css/')))
        .pipe(browserSync.stream());
});

// copy javascript task
gulp.task('jsMainDbg', function() {
    return gulp.src([
            //VENDOR
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/bootstrap/dist/js/bootstrap.min.js',

            //PLUGINS
            'bower_components/jcf/dist/js/jcf.js',
            'bower_components/jcf/dist/js/jcf.radio.js',
            'bower_components/jcf/dist/js/jcf.checkbox.js',
            'bower_components/jcf/dist/js/jcf.select.js',
            'bower_components/slick-carousel/slick/slick.min.js',
            'plugins/**/*.js',

            //APP
            'script/global.js',
            'script/app.js',
            'script/*Includes*/*.js'
        ])
        .pipe(concat('main.js'))
        // .pipe(uglifyjs())
        .pipe(gulp.dest(path.join(__dirname, '../assets-debug/js/')))
        //.pipe(browserSync.stream()); //uncomment to browser sync after js updated
});

//Watcher active
gulp.task('watch', function() {
    watch(path.join(__dirname, "sass/**/*.scss"), function() { runs('sassMainDbg'); });
    watch(paths.sass, function() { runs('sassMainDbg'); });
    watch(paths.js, function() { runs('jsMainDbg'); });
});

gulp.task('init', ['sassMainDbg', 'jsMainDbg']);

//COPY FROM MASTER
gulp.task('debug', ['init', 'html', 'watch'], function() {

    browserSync.init({
        server: {
            baseDir: [(path.join(__dirname, '../'))]
        }
    });
    watch(path.join(__dirname, '../views/Pages/*.html'), function() {
        runs('html');
    });
});


//------------------------ASSETS-BIN----------------------------//

gulp.task('sassMainBin', function() {
    return gulp.src([
            //VENDOR
            'bower_components/bootstrap/dist/css/bootstrap.min.css',
            //'sass/*bootstrap*/_bootstrap.scss',

            //PLUGINS
            'bower_components/jcf/dist/css/theme-minimal/jcf.css',
            //"bower_components/jcf/dist/css/demo.css,
            'bower_components/slick-carousel/slick/slick.css',
            'bower_components/slick-carousel/slick/slick-theme.css',
            // FONT AWESOME CSS
            'bower_components/font-awesome/css/font-awesome.css',
            'plugins/**/*.css',

            //CUSTOM
            'sass/*.scss'
        ])
        .pipe(sourcemaps.init())
        .pipe(concat('main.css'))
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: bourbon.includePaths
        }).on('error', sass.logError))
        .pipe(postcss([autoprefixer({ browsers: ['> 0%'] })]))
        //.pipe(uglifycss())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(path.join(__dirname, '../assets-bin/css/')))
        .pipe(browserSync.stream());
});

// copy javascript task
gulp.task('jsMainBin', function() {
    return gulp.src([
            //VENDOR
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/bootstrap/dist/js/bootstrap.min.js',

            //PLUGINS
            'bower_components/jcf/dist/js/jcf.js',
            'bower_components/jcf/dist/js/jcf.radio.js',
            'bower_components/jcf/dist/js/jcf.checkbox.js',
            'bower_components/jcf/dist/js/jcf.select.js',
            'bower_components/slick-carousel/slick/slick.min.js',
            'plugins/**/*.js',

            //APP
            'script/global.js',
            'script/app.js',
            'script/*Includes*/*.js'
        ])
        .pipe(concat('main.js'))
        .pipe(uglifyjs())
        .pipe(gulp.dest(path.join(__dirname, '../assets-bin/js/')))
        //.pipe(browserSync.stream()); //uncomment to browser sync after js updated
});

gulp.task('initBin', ['sassMainBin', 'jsMainBin']);

gulp.task('bin', ['initBin']);


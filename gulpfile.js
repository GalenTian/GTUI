var gulp = require('gulp'),
    less = require('gulp-less'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    cleancss = require('gulp-cleancss'),
    clean = require('gulp-clean'),
    zip = require('gulp-zip'),
    nuget = require('gulp-nuget'),
    header = require('gulp-header');
    webpack = require('webpack-stream'),
    fs = require('fs'),
    argv = require('yargs').argv;

var banner = '/* Packaged at <%= date %>. Version: <%= version %> */\n',
    date = new Date(),
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    bannerJson = {
        date: date.getHours() + ':' + date.getMinutes() + ' ' + months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear(),
        version: argv.v ? argv.v : 'None'
    };

gulp.task('clean', function () {
    return gulp.src('./dist/', { read: false }).pipe(clean());
});

gulp.task('js', ['clean'], function () {

    return gulp.src('./build/pub/build.js')
        .pipe(webpack({
            output: {
                filename: 'gtui.js'
            }
        }))
        .pipe(header(banner, bannerJson))
        .pipe(gulp.dest('./dist/pub/js/'))
        .pipe(rename('gtui.min.js'))
        .pipe(gulp.dest('./dist/pub/js/'))
        .pipe(uglify())
        .pipe(header(banner, bannerJson))
        .pipe(gulp.dest('./dist/pub/js/'));
});

gulp.task('css', ['clean'], function () {
    
    return gulp.src('./build/pub/build.less')
        .pipe(less())
        .pipe(header(banner, bannerJson))
        .pipe(rename('gtui.css'))
        .pipe(gulp.dest('./dist/pub/css/'))
        .pipe(rename('gtui.min.css'))
        .pipe(cleancss())
        .pipe(header(banner, bannerJson))
        .pipe(gulp.dest('./dist/pub/css/'));
});

gulp.task('fonts', ['clean'], function () {
    var FONT_ROOT = './fonts/';

    return gulp.src(FONT_ROOT + '*.*')
        .pipe(gulp.dest('./dist/pub/fonts/'));
});

gulp.task('default', ['clean', 'css', 'fonts', 'js'], function () {
    return gulp;
});
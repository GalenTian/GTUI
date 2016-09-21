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

var projectName = 'gtui',

    buildFolder = './build/',
    fontsSrcFolder = './fonts/',

    distFolder = './dist/',
    cssFolder = distFolder + 'css/',
    jsFolder = distFolder + 'js/',
    fontsFolder = distFolder + 'fonts/',
        
    jsExt = '.js',
    minJsExt = '.min.js',
    lessExt = '.less',
    cssExt = '.css',
    minCssExt = '.min.css',
        
    allFiles = '*.*';

var tasks = ['clean', 'js', 'css', 'fonts'];

gulp.task(tasks[0], function () {
    return gulp.src(distFolder, { read: false }).pipe(clean());
});

gulp.task(tasks[1], [tasks[0]], function () {

    return gulp.src(buildFolder + projectName + jsExt)
        .pipe(webpack({
            output: {
                filename: projectName + jsExt
            }
        }))
        .pipe(header(banner, bannerJson))
        .pipe(gulp.dest(jsFolder))
        .pipe(rename(projectName + minJsExt))
        .pipe(gulp.dest(jsFolder))
        .pipe(uglify())
        .pipe(header(banner, bannerJson))
        .pipe(gulp.dest(jsFolder));
});

gulp.task(tasks[2], [tasks[0]], function () {
    
    return gulp.src(buildFolder + projectName + lessExt)
        .pipe(less())
        .pipe(header(banner, bannerJson))
        .pipe(rename(projectName + cssExt))
        .pipe(gulp.dest(cssFolder))
        .pipe(rename(projectName + minCssExt))
        .pipe(cleancss())
        .pipe(header(banner, bannerJson))
        .pipe(gulp.dest(cssFolder));
});

gulp.task(tasks[3], [tasks[0]], function () {

    return gulp.src(fontsSrcFolder + allFiles)
        .pipe(gulp.dest(fontsFolder));
});

gulp.task('default', tasks, function () {
    return gulp;
});
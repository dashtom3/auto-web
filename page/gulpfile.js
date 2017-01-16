var gulp = require('gulp'),
minifycss = require('gulp-minify-css'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify'),
rename = require('gulp-rename'),
del = require('del');

gulp.task('minifycss', function() {
    return gulp.src('project/css/*.css')      //压缩的文件
    .pipe(concat('main.css'))  
    .pipe(gulp.dest('minified/css'))  
    .pipe(rename({ suffix: '.min' }))  
    .pipe(minifycss())  
    .pipe(gulp.dest('minified/css')) ;   //执行压缩
});
gulp.task('minifyjs', function() {
    return gulp.src('project/scripts/**/*.js')
        .pipe(concat('main.js'))    //合并所有js到main.js
        .pipe(gulp.dest('minified/js'))    //输出main.js到文件夹
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('minified/js'));  //输出
    });

gulp.task('clean', function(cb) {
    del(['minified/css', 'minified/js'], cb)
});

gulp.task('default', function() {
    gulp.start('minifycss', 'minifyjs');
});
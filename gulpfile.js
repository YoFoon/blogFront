var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    reload      = browserSync.reload,
    sourcemaps = require('gulp-sourcemaps'),
    imagemin=require('gulp-imagemin');

gulp.task('default', ['sass','scripts','libs','images','browser-sync','watcher']);

gulp.task('sass', function() {
    return gulp.src('./src/scss/**/*.scss') //匹配文件
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({               //进行浏览器兼容
            browsers: ['last 10 versions']
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/css'));    //输出压缩好的新css文件
});

// gulp.task('fonts',function(){
//     return gulp.src('./src/font/**/*.ttf')
//     .pipe(gulp.dest('./dist/font'))
// })

gulp.task('scripts', function() {
    return gulp.src([
	        './src/js/**/*.js',
	    ])
	    .pipe(uglify())                 // 压缩一份
	    .pipe(gulp.dest('./dist/js'));  // 写入到指定目录
});

gulp.task('libs', function() {
    return gulp.src([
          './src/lib/**/*.js'
      ])
      .pipe(concat('app.js'))         // 合并为一个文件
      .pipe(gulp.dest('./dist/lib'))   // 写入一份到指定目录
});

gulp.task('images',function(){
   return gulp.src('./src/images/**/*.+(jpeg|jpg|png|gif)')
   .pipe(gulp.dest('./dist/images'));
})

gulp.task('watcher', function() {
    gulp.watch("src/scss/**/*.scss", ['sass']).on('change', reload);
    gulp.watch("src/js/**/*.js", ['scripts']).on('change', reload);
    gulp.watch("src/lib/**/*.js", ['libs']).on('change', reload);
    gulp.watch("index.html").on('change', reload);
    gulp.watch("src/images/**/*.+(jpeg|jpg|png|gif)",['images']).on('change',reload);
});

// 静态服务器
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

// 代理
/*gulp.task('browser-sync', function() {
  browserSync.init({
    proxy: "kd.me"
  });
});*/

//上传前图片压缩
gulp.task('img-res',function(){
   return gulp.src('./src/images/**/*.+(jpeg|jpg|png|gif)')
   .pipe(imagemin())
   .pipe(gulp.dest('./dist/images'));
})
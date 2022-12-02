const gulp = require('gulp');
const deploy = require('gulp-gh-pages');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');



//Static server
gulp.task('server', function() {
    browserSync.init({
      server: {
        baseDir: "src"
      }
    })
});
gulp.task('styles', function() {
  return gulp.src('src/sass/**/*.+(scss|sass)')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename({
      prefix: "",
      suffix: ".min",
    }))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream())
});
gulp.task('watch', function() {
  gulp.watch('src/sass/**/*.+(scss|sass)', gulp.parallel('styles'))
  gulp.watch('src/*.html').on('change', browserSync.reload)
});
gulp.task('default', gulp.parallel('watch', 'server', 'styles'));
gulp.task('deploy', function () {
  return gulp.src("./dist/**/*")
    .pipe(deploy())
});

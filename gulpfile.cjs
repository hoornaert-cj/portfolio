const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

function style() {
  return src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./src/css'))
    .pipe(browserSync.stream());
}

function serve() {
  browserSync.init({
    server: {
      baseDir: './src',
    },
    port: 3000
  });

  watch('./src/sass/**/*.scss', style);
  watch('./src/*.html').on('change', browserSync.reload);
  watch('./src/js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.serve = serve;
exports.default = series(style, serve);

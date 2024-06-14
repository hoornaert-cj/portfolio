const { src, dest, watch, series } = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');


const paths = {
  styles: {
    src: 'src/sass/**/*.scss',
    dest: 'src/styles'
  }
};

function style() {
  return src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.styles.dest));
}

function watchTask() {
  watch(paths.styles.src, style);
}

exports.style = style;
exports.watch = watchTask;
exports.default = series(style, watchTask);

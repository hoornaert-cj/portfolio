import { src, dest, watch, series } from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import cleanCSS from 'gulp-clean-css';

const paths = {
  styles: {
    src: 'src/sass/**/*.scss',
    dest: 'src/css'
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

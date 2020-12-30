const { src, dest, task, series, watch, parallel } = require("gulp");
const clean = require('gulp-clean');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const px2rem = require('gulp-smile-px2rem');
const gcmq = require('gulp-group-css-media-queries');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
// const gulpIf = require("gulp-if");
const reload = browserSync.reload;

const {SRC_PATH, DIST_PATH, STYLE_LIBS, JS_LIBS} = require('./gulp.config');
sass.compiler = require('node-sass');

// const env = process.env.NODE_ENV;

task('clean', () => {
  return src(`${DIST_PATH}/**/*`, {read: false}).pipe(clean());
})

task('copy:html', () => {
  return src(`${SRC_PATH}/*.html`).pipe(dest(DIST_PATH)).pipe(reload({stream:true}));
})

task('copy:script', () => {
  return src(`${SRC_PATH}/script/*.js`).pipe(dest(`${DIST_PATH}/script`)).pipe(reload({stream:true}));
})

task('copy:images', () => {
  return src(`${SRC_PATH}/images/**/*`).pipe(dest(`${DIST_PATH}/images`)).pipe(reload({stream:true}));
})

task('copy:video', () => {
  return src(`${SRC_PATH}/video/*`).pipe(dest(`${DIST_PATH}/video`)).pipe(reload({stream:true}));
})

const styles = [
  './node_modules/normalize.css/normalize.css',
  './src/main.scss',
  './src/scss/layout/base.scss'
];

task('server', () => {
  browserSync.init({
      server: {
          baseDir: './dist'
      },
      open: false
  });
});

task('styles', ()=> {
  return src(styles)
  .pipe(sourcemaps.init())
  // .pipe(gulpIf(env === 'dev', sourcemaps.init()))
  .pipe(concat('main.min.scss'))
  .pipe(sassGlob())
  .pipe(sass().on('error', sass.logError))
  // .pipe(px2rem())
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
      cascade: false
    }))
  // .pipe(gulpIf(env === 'dev', 
  // autoprefixer({
  //   browsers: ['last 2 versions'],
  //   cascade: false
  // })))
  // .pipe(gcmq())
  // .pipe(gulpIf(env === 'prod', gcmq()))
  // .pipe(gulpIf(env === 'prod', cleanCSS({compatibility: 'ie8'})))
  .pipe(cleanCSS())
  .pipe(sourcemaps.write())
  // .pipe(gulpIf(env === 'dev', sourcemaps.write()))
  .pipe(dest(DIST_PATH))
  .pipe(reload({stream:true}));
});

const libs = [
  'node_modules/jquery/dist/jquery.js',
  'src/scripts/*.js'
 ];

task('scripts', () => {
  return src([...JS_LIBS, 'src/scripts/*.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.js', {newLine: ';'}))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(dest(DIST_PATH))
    .pipe(reload({stream:true}));
})


watch('./src/**/*.scss', series('styles'));
watch('./src/*.html', series('copy:html'));
watch('./src/script/*.js', series('scripts'));
task('default', series('clean', parallel('copy:html','copy:script','copy:images','copy:video','styles','scripts'),'server'));
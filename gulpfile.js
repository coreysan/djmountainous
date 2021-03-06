// Assigning modules to local variables
var path        = require('path');
var gulp        = require('gulp');
var sass        = require('gulp-sass');
var browserSync = require('browser-sync').create();
var header      = require('gulp-header');
var cleanCSS    = require('gulp-clean-css');
var rename      = require("gulp-rename");
var babel       = require("gulp-babel");//ES6 - ES2015
var concat      = require("gulp-concat");
var useref      = require("gulp-useref");
var uglify      = require('gulp-uglify');
var cacheBust   = require('gulp-cache-bust');
var gulpUtil    = require('gulp-util');
var sourcemaps  = require('gulp-sourcemaps');
var handlebars  = require('gulp-handlebars');
var wrap        = require('gulp-wrap');
var declare     = require('gulp-declare');

var pkg         = require('./package.json');

// Set the banner content
var banner = ['/*!\n',
    ' * DJ Mountainous - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright 2016-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' */\n',
    ''
].join('');

// Default task
gulp.task('default', ['html', 'sass', 'templates', 'js', 'copy']);

// Sass task to compile the sass files and add the banner
gulp.task('sass', function() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(rename({
          basename: 'all',
          suffix: '.min',
          extname: ".css"
        }))
        .pipe(gulp.dest('tmp'))
        .pipe(sourcemaps.init())
        //no concat - only one file
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(header(banner, { pkg: pkg }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'))
        // .pipe(browserSync.reload({
        //     stream: true
        // }))
});

/* Replaces references in index.html 
  with references to minified js/css files

  Also concats js/css files listed, but those files are not minified. 

  Minified/sourcemapped js.css files are given by the js and sass tasks.
*/
gulp.task('html', function(){
  return gulp.src('index.html')
        .pipe(useref())//replace refs for dist
        //no minification - no gain
        .pipe(cacheBust({
            type: 'timestamp'
        }))
        .pipe(gulp.dest('dist'));
});

//== JS SECTION START ==\\
// gulp handlebar templates into templates.js
// can't get this to work
gulp.task('templates', function(){
  gulp.src('src/**/*.hbs')
    .pipe(handlebars({
      handlebars: require('handlebars')
    }))
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'MyApp.templates',
      noRedeclare: true, // Avoid duplicate declarations 
    }))
    .pipe(concat('templates.js'))
    .pipe(uglify().on('error', gulpUtil.log))
    .pipe(rename({
          suffix: '.min',
          extname: ".js"
        }))
    .pipe(gulp.dest('tmp'))
    .pipe(gulp.dest('dist'));
});


gulp.task('js', ['templates'], function() {
  return gulp.src( [
                    // templates not included in minify
                    // cause they're not being generated-then-included properly, sequentially, asynchronously
                    // 'src/js/templates/templates.js', 
                    'src/js/audio-player.js',
                    'src/js/grayscale.js',
                    'src/js/homepage-animations.js',    
                    'src/js/site.js'
                    ])
      .pipe(sourcemaps.init())
        .pipe(babel({presets: ['es2015']}))
        .pipe(concat('all'))
        .pipe(rename({
          basename: 'all',
          suffix: '.min',
          extname: ".js"
        }))
        .pipe(uglify().on('error', gulpUtil.log))
        .pipe(header(banner, { pkg: pkg }))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('dist'))
      // .pipe(browserSync.reload({
      //     stream: true
      // }))
});


// Copy Bootstrap core files from node_modules to vendor directory
gulp.task('bootstrap', function() {
    return gulp.src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
        .pipe(gulp.dest('vendor/bootstrap'))
})

// Copy jQuery core files from node_modules to vendor directory
gulp.task('jquery', function() {
    return gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('vendor/jquery'))
})

// Copy Font Awesome core files from node_modules to vendor directory
gulp.task('fontawesome', function() {
    return gulp.src([
            'node_modules/font-awesome/**',
            '!node_modules/font-awesome/**/*.map',
            '!node_modules/font-awesome/.npmignore',
            '!node_modules/font-awesome/*.txt',
            '!node_modules/font-awesome/*.md',
            '!node_modules/font-awesome/*.json'
        ])
        .pipe(gulp.dest('vendor/font-awesome'))
})

// Copy all dependencies from node_modules
gulp.task('copy', ['bootstrap', 'jquery', 'fontawesome']);

// Configure the browserSync task
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: ''
        },
    })
});

// Watch Task that compiles LESS and watches for HTML or JS changes and reloads with browserSync
gulp.task('watch', function () {
  gulp.watch('./src/**/*.scss', ['sass']);
  gulp.watch('index.html', ['html']);
  gulp.watch('./src/**/*.js', ['js']);
  gulp.watch('./src/**/*.hbs', ['templates', 'js']);
});
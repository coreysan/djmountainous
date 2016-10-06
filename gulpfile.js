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
var uglify      = require('gulp-uglify');
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
gulp.task('default', ['sass', 'minify-css', 'templates', 'minify-js', 'copy']);

// Sass task to compile the sass files and add the banner
gulp.task('sass', function() {
    return gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(header(banner, { pkg: pkg }))
        .pipe(concat('all.css'))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify CSS
gulp.task('minify-css', function() {
  return gulp.src('css/**/*.css')
      .pipe(cleanCSS({ compatibility: 'ie8' }))
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest('./build'))
      .pipe(browserSync.reload({
            stream: true
        }))  
});


//== JS SECTION START ==\\
// gulp handlebar templates into templates.js
// can't get this to work
gulp.task('templates', function(){
  gulp.src('js/templates/*.hbs')
    .pipe(handlebars({
      handlebars: require('handlebars')
    }))
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'MyApp.templates',
      noRedeclare: true, // Avoid duplicate declarations 
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('build/'));
});

gulp.task('minify-js', ['templates'], function() {
  return gulp.src( [
                    // templates not included in minify
                    // cause they're not being generated-then-included properly, sequentially, asynchronously
                    // 'build/templates.js', 
                    'js/circle-player/*.js',
                    'js/grayscale.js',
                    'js/homepage-animations.js',    
                    'js/site.js'
                    ]) 
      .pipe(sourcemaps.init())
        // .pipe(babel({
        //     presets: ['es2015']
        // }))
        .pipe(concat('all.js'))
        .pipe(rename({
          suffix: '-min',// why doesn't .min work here!???
        }))
        .pipe(uglify())
        .pipe(header(banner, { pkg: pkg }))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('build'))
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
gulp.task('dev', ['browserSync', 'sass', 'minify-css', 'minify-js'], function() {
    gulp.watch('sass/*.sass', ['sass']);    
    gulp.watch('css/*.css', ['minify-css']);
    gulp.watch('js/*.js', ['minify-js']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('js/**/*.js', browserSync.reload);
});

gulp.task('watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
  gulp.watch('./css/**/*.css', ['minify-css']);
  gulp.watch('./js/**/*.hbs', ['templates', 'minify-js']);
  gulp.watch('./js/**/*.js', ['minify-js']);
});
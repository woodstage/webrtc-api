var gulp        = require('gulp');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var browserify = require('gulp-browserify');
var babel = require('gulp-babel');

// Static server
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: 'docs'
    }
  });
});

gulp.task('dist', function() {
    // Single entry point to browserify 
  gulp.src('src/webrtc.js')
    .pipe(browserify({
      transform: ['babelify'],
      insertGlobals : true
    }))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('dist'))
});

gulp.task('build', function () {
  gulp.src('src/*.js')
    .pipe(babel())
    .pipe(gulp.dest('build'))
})

gulp.task('demos', function() {
    // Single entry point to browserify 
  gulp.src('src/webrtc.js')
    .pipe(browserify({
      transform: ['babelify'],
      insertGlobals : true
    }))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('docs'))
});

gulp.task('watch-docs', function() {
   gulp.watch('docs/**', function() {
      browserSync.reload();
   })
})

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(['src/*.js'], ['demos', 'dist']);
});

gulp.task('dev', ['watch', 'browser-sync', 'watch-docs'], function() {
  
})

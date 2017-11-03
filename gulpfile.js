var gulp        = require('gulp');
var rename = require("gulp-rename");
var browserSync = require('browser-sync').create();
var browserify = require('gulp-browserify');

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "demos"
        }
    });
});

// gulp.task('clean', function() {
//   // You can use multiple globbing patterns as you would with `gulp.src`
//   return del(['build']);
// });

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

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(['src/*.js'], ['demos', 'dist']);
});

gulp.task('dev', ['watch', 'browser-sync'], function() {
  
})

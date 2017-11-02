var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var sass = require('gulp-sass');

gulp.task('browser-sync', ['sass'], () => {

    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch('styles/sass/*.scss', ['sass']);
    gulp.watch('*.html').on('change', reload);
    gulp.watch('JS/*.js').on('change', reload);
})

.task('sass', () => {
    return gulp.src('./styles/sass/*.scss')
               .pipe(sass().on('error', sass.logError))
               .pipe(gulp.dest('./styles/css'))
               .pipe(browserSync.stream()); 
})

.task('default', ['browser-sync'])
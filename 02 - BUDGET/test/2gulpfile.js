var gulp = require("gulp"); // # 1) Chargement du "task automater"
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');


gulp.task('browser-sync', ['sass', 'ts'],() => {

    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("styles/scss/*.scss", ['sass']);
    gulp.watch('./Ts/**/*.ts', ['ts']);
    gulp.watch('*.html').on('change', browserSync.reload);
    // gulp.watch("Js/*.js").on('change', browserSync.reload);
});

gulp.task('sass', () => {
    return gulp.src('./styles/sass/*.scss')
               .pipe(sass().on('error', sass.logError))
               .pipe(gulp.dest('./styles/css'))
               .pipe(browserSync.stream());
});

gulp.task('ts', () => {

    return gulp.src('Ts/*.ts')
               .pipe(sourcemaps.init())
               .pipe(ts({
                module : "system",         // Spécifie le module du 'code generation' (tsc)
                noImplicitAny : true,      // Va forcer à demander un type (non any)
                target : "ES6",            // Je veux cibler de l'es2017
                sourceMap : true,          // Permet de générer le mappage (console.log des ts affichés à la place des console.log Js)
                preserveConstEnums : true, // N'effaces pas les constantes déclarées
                experimentalDecorators : true,
               }))
               .pipe(sourcemaps.write())
               .pipe(gulp.dest('Js'))
               .pipe(browserSync.stream());
});

gulp.task('default', ['browser-sync']);
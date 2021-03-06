import gulp from "gulp";
import babel from "gulp-babel";
import browserify from "gulp-browserify";
import del from "del";
import browserSync from 'browser-sync';

gulp.task("babel-lib", ["pre-flush"], () => {
    return gulp.src("./src/lib/**/*.js")
        .pipe(babel({ presets: ["env"] }))
        .pipe(gulp.dest("./src/build/lib/"));
});

gulp.task("babel-index", ["babel-lib"], () => {
    return gulp.src("./src/index.js")
        .pipe(babel({ presets: ["env"] }))
        .pipe(gulp.dest("./src/build/"));
});

gulp.task("browserify-index", ["babel-index"], () => {
    return gulp.src("./src/build/index.js")
        .pipe(browserify())
        .pipe(gulp.dest("./dist/"));
});

gulp.task("post-flush", () => { del.sync("./src/build/"); });

gulp.task("pre-flush", () => {
    del.sync("./src/build/");
    del.sync("./dist/");
});

gulp.task('assets-game-objects', () => {
    return gulp.src('./src/assets/gameObjects/*.png')
        .pipe(gulp.dest('./dist/assets/gameObjects/'));
});

gulp.task("build", ["pre-flush", "babel-lib", "babel-index", "browserify-index", 'assets-game-objects'], () => {
    del.sync("./src/build/");
    gulp.src("./src/index.html").pipe(gulp.dest("./dist/"));
});

gulp.task('browser-sync', () => {
    return browserSync({
        server: { baseDir: 'dist' },
        notify: false,
        open: false
    });
});

gulp.task("default", ["build"]);
var gulp = require("gulp");
//npm install gulp@3.9.1 --save-dev

//npm install --save-dev gulp-compass
const compass = require("gulp-compass"),
  //npm install --save-dev gulp-uglifycss
  uglifycss = require("gulp-uglifycss"),
  //npm install --save-dev gulp-minify
  minify = require("gulp-minify"),
  //npm install --save-dev gulp-babel babel-core babel-preset-env babel-polyfill babel-preset-es2015 babel-preset-stage-2
  babel = require("gulp-babel"),
  //npm i autoprefixer --save-dev
  autoprefixer = require("autoprefixer"),
  //npm install --save-dev gulp-postcss
  postcss = require("gulp-postcss"),
  //npm i gulp-sourcemaps --save-dev
  sourcemaps = require("gulp-sourcemaps"),
  //npm install --save gulp-htmlmin
  htmlmin = require("gulp-htmlmin");

//minifys html
gulp.task("htmlmin", () => {
  return gulp
    .src("dev/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("."));
});

//Converts sass to css, autoprefix, save to dev/css and minify and save to /css
// uses compass, uglifycss, autoprefixer, postcss and sourcemaps
gulp.task("sass", function() {
  gulp
    .src(`dev/sass/style.scss`)
    .pipe(
      compass({
        css: `dev/css`,
        sass: `dev/sass`,
        project: __dirname + "/"
      })
    )
    .on("error", function(error) {
      // Would like to catch the error here
      console.log(error);
      this.emit("end");
    })
    .pipe(sourcemaps.init())
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(`dev/css`))
    .pipe(
      uglifycss({
        uglyComments: true
      })
    )
    .pipe(gulp.dest(`css`));
});

//compile JS to browser compatible older vanilla code, then minify
//uses babel and gulp-minify
gulp.task("babel", function() {
  return gulp
    .src([`dev/script/*.js`])
    .pipe(babel({ presets: ["es2015"] }))
    .pipe(minify())
    .pipe(gulp.dest(`/script`));
});

//basic run command of all tasks
gulp.task("run", ["sass", "babel", "htmlmin"]);

//gulp watch task watching specific folders/files
gulp.task("watch", function() {
  gulp.watch(`dev/sass/*.scss`, ["sass"]);
  gulp.watch(`dev/script/*.js`, ["babel"]);
  gulp.watch(`dev/*.html`, ["htmlmin"]);
});

gulp.task("default", ["run", "watch"]);

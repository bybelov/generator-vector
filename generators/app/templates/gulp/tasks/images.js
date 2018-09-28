var gulp        = require('gulp'),
  plumber       = require('gulp-plumber'),
  imagemin      = require('gulp-imagemin'),
  newer         = require('gulp-newer'),
  spritesmith   = require('gulp.spritesmith'),
  config        = require('../config.js');

gulp.task('images', function() {
  gulp.src([
    config.src.images + '/**/*.{jpg,png,jpeg,svg,gif}',
    '!' + config.src.iconsPng + '/**/*.png'
  ])
    .pipe(newer(config.dest.images))
    .pipe(plumber())
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}), //сжатие .gif
      imagemin.jpegtran({progressive: true}), //сжатие .jpg
      imagemin.optipng({optimizationLevel: 3}), //степень сжатия от 0 до 7
      imagemin.svgo({plugins: [{removeViewBox: false}]}) //сжатие .svg
    ],{
      verbose: true
    }))
    .pipe(gulp.dest(config.dest.images));
});

gulp.task('sprite:png', function() {
  var spriteData =
    gulp.src(config.src.iconsPng + '/*.png') //выберем откуда брать изображения для объединения в спрайт
      .pipe(plumber())
      .pipe(spritesmith({
        imgName: 'sprite.png', //имя спрайтового изображения
        cssName: '_img-sprite.scss', //имя стиля где храним позиции изображений в спрайте
        imgPath: '../images/sprite.png', //путь где лежит спрайт (для стилей)
        cssFormat: 'scss', //формат в котором обрабатываем позиции
        cssTemplate: 'gulp/tasks/sprites/imgToScssSprite.mustache', //файл маски
        cssVarMap: function(sprite) {
          sprite.name = 's-' + sprite.name; //имя каждого спрайта будет состоять из имени файла и конструкции 's-' в начале имени
        }
      }));
  spriteData.img.pipe(gulp.dest(config.dest.images)); // путь, куда сохраняем картинку
  spriteData.css.pipe(gulp.dest(config.src.scss + '/6-components/sprites')); // путь, куда сохраняем стили
});


gulp.task('picture', [
  'sprite:png',
  'images'
]);

gulp.task('picture:watch', function() {
  gulp.watch([
    '!' + config.src.iconsPng + '/**/*.png', 
    config.src.images + '/**/*.{jpg,png,jpeg,svg,gif}'
  ],['images']);
  gulp.watch(config.src.iconsPng + '/*.png', ['sprite:png']);
});

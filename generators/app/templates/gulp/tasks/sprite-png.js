import gulp from 'gulp';
import plumber from 'gulp-plumber';
import spritesmith from 'gulp.spritesmith';
import config from '../config';

gulp.task('sprite:png', done => {

  let spriteData = gulp
        .src(config.src.iconsPng + '/*.png') //выберем откуда брать изображения для объединения в спрайт
        .pipe(plumber())
        .pipe(spritesmith({
          imgName: 'sprite.png', //имя спрайтового изображения
          cssName: '_img-sprite.scss', //имя стиля где храним позиции изображений в спрайте
          imgPath: '../images/sprite.png', //путь где лежит спрайт (для стилей)
          cssFormat: 'scss', //формат в котором обрабатываем позиции
          cssTemplate: 'gulp/tasks/sprite-png/imgToScssSprite.mustache', //файл маски
          cssVarMap: function(sprite) {
            sprite.name = 's-' + sprite.name; //имя каждого спрайта будет состоять из имени файла и конструкции 's-' в начале имени
          }
        }));
      spriteData.img.pipe(gulp.dest(config.dest.images)); // путь, куда сохраняем картинку
      spriteData.css.pipe(gulp.dest(config.src.scss + '/6-components/sprites')); // путь, куда сохраняем стили

  done();
});


const build = gulp => gulp.parallel('sprite:png');
const watch = gulp => () => gulp.watch( config.src.iconsPng + '/*.png', gulp.series('sprite:png'));

module.exports.build = build;
module.exports.watch = watch;
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import spritesmith from 'gulp.spritesmith';
import config from '../config';

gulp.task('sprite:png', done => {

  let spriteData = gulp
    .src(config.src.iconsPng + '/*.png') // source picture for sprite
    .pipe(plumber())
    .pipe(spritesmith({
      imgName: 'sprite.png', // file name sprite image
      cssName: '_img-sprite.scss', // file name style sprite
      imgPath: '../images/sprite.png', // path for sprite
      cssFormat: 'scss',
      cssTemplate: 'gulp/tasks/sprite-png/imgToScssSprite.mustache', // mask
      cssVarMap: function(sprite) {
        sprite.name = 's-' + sprite.name; // name every sprite
      }
    }));
  spriteData.img.pipe(gulp.dest(config.dest.images)); // destination path for sprite
  spriteData.css.pipe(gulp.dest(config.src.scss + '/6-components/sprites')); // destination path for styles

  done();
});


const build = gulp => gulp.parallel('sprite:png');
const watch = gulp => () => gulp.watch( config.src.iconsPng + '/*.png', gulp.series('sprite:png'));

module.exports.build = build;
module.exports.watch = watch;

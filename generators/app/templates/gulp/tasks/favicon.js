import gulp from 'gulp';
import favicons from 'favicons';
import log from 'fancy-log';
import config from '../config';

gulp.task("favicon", () => gulp
  .src(config.src.favicon)
  .pipe( favicons.stream({
    appName: "My Site",
    appShortName: "Site",
    appDescription: "Static layout pages",
    background: "#ffffff",
    path: "/",
    url: "/",
    display: "standalone",
    orientation: "natural",
    lang: "ru-RU",
    start_url: "/",
    version: 1.0,
    logging: false,
    html: '../src/pages/templates/_favicon.html',
    pipeHTML: true,
    replace: true,
    icons: {
      // Platform Options:
      // - offset - offset in percentage
      // - background:
      //   * false - use default
      //   * true - force use default, e.g. set background for Android icons
      //   * color - set background for the specified icons
      //   * mask - apply mask in order to create circle icon (applied by default for firefox). `boolean`
      //   * overlayGlow - apply glow effect after mask has been applied (applied by default for firefox). `boolean`
      //   * overlayShadow - apply drop shadow after mask has been applied .`boolean`
      //
      android: true,              // Create Android homescreen icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
      appleIcon: true,            // Create Apple touch icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
      appleStartup: false,         // Create Apple startup images. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
      coast: false,                // Create Opera Coast icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
      favicons: true,             // Create regular favicons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
      firefox: false,              // Create Firefox OS icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
      windows: true,              // Create Windows 8 tile icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
      yandex: false                // Create Yandex browser icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
    }
  }))
  .on("error", log)
  .pipe(gulp.dest(config.dest.root))
);

const build = gulp => gulp.parallel('favicon');
module.exports.build = build;
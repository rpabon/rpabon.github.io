var siteRoot = './_site';

var config = {
  paths: {
    css: {
      src: siteRoot + '/style.css',
      dest: siteRoot
    },
    js: {
      src: siteRoot + '/main.js',
      dest: siteRoot
    },
    img: {
      src: siteRoot + '/img/**/*.{png,jpg,gif}',
      dest: siteRoot + '/img'
    }
  }
};

module.exports = config;

var config = require('./')
,   argv   = require('yargs').argv;

module.exports = {
  srcDir: config.sourceDirectory + 'templates',
  src: config.sourceDirectory + 'templates/**/*.pug',
  dest: config.prototypeDirectory,
}

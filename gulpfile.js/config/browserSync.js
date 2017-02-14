
var config = require('./')
,   argv   = require('yargs').argv;

if (argv.proto){
  module.exports = {
    port: 1337,
    server: {
      baseDir: config.prototypeDirectory
    },
    files: [config.prototypeDirectory +'**']
  }
} else {
  module.exports = {
    files: [
      config.appDirectory  + "static/**",
      config.appDirectory  + "templates/**/*.html"
    ],
    proxy: (argv.docker) ? "backend:8000" : "localhost:8000",
    port: 1337,
    ghostMode: {
      clicks: true,
      forms: true,
      scroll: false
    },
    open: (argv.docker) ? false : true
  }
}

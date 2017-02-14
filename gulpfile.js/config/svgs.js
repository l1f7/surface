var config = require('./')
,   fs     = require('fs')
,   path   = require('path')
,   argv   = require('yargs').argv;

/**
 * svgmin config object
 */
module.exports.svg = {
  src: config.sourceAssets + 'svgs/*.svg',
  dest: (argv.proto) ? config.prototypeAssets + 'svgs' : config.appDirectory + 'templates/includes/svgs/',
  svgmin: {
    plugins: [
      {
        cleanupAttrs: true
      },
      {
        cleanupEnableBackground: true
      },
      {
        cleanupIDs: true
      },
      {
        cleanupListOfValues: false,
        floatPrecision: 3
      },
      {
        cleanupNumericValues: true,
        floatPrecision: 3
      },
      {
        collapseGroups: true
      },
      {
        convertColors: true
      },
      {
        convertPathData: true,
        floatPrecision: 3
      },
      {
        convertShapeToPath: true
      },
      {
        convertStyleToAttrs: true
      },
      {
        convertTransform: true
      },
      {
        mergePaths: true
      },
      {
        moveElemsAttrsToGroup: true
      },
      {
        moveGroupAttrsToElems: true
      },
      {
        removeComments: true
      },
      {
        removeDesc: true
      },
      {
        removeDimensions: true
      },
      {
        removeDoctype: true
      },
      {
        removeEditorsNSData: true
      },
      {
        removeEmptyAttrs: true
      },
      {
        removeEmptyContainers: true
      },
      {
        removeEmptyText: true
      },
      {
        removeHiddenElems: true
      },
      {
        removeMetadata: true
      },
      {
        removeNonInheritableGroupAttrs: true
      },
      {
        removeRasterImages: false
      },
      {
        removeTitle: true
      },
      {
        removeUnknownsAndDefaults: true
      },
      {
        removeUselessDefs: true
      },
      {
        removeUnusedNS: true
      },
      {
        removeUselessStrokeAndFill: true
      },
      {
        removeViewBox: false
      },
      {
        removeXMLProcInst: true
      },
      {
        sortAttrs: true
      },
      {
        transformsWithOnePath: false
      }
    ]
  }
}

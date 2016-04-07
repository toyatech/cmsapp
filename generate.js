var gulp = require('gulp')
  , runSequence = require('run-sequence')
  , tap = require('gulp-tap')
  , source = require('viynl-source-stream')
  , rename = require('gulp-rename')
  , estemplate = require('gulp-estemplate')
  , path = require('path')
  , print = require('gulp-print');

var memory = {
  templates: {},
  schemas: {},
  packages: []
};

var paths = {
  templates: '../mean-estemplates/**/*.jst',
  schemas: 'schemas/**/*.json',
  packages: 'packages/custom'
};

function loadTemplates() {
  return gulp.src([paths.templates])
    .pipe(tap(function(file) {
      memory.templates[file.path.replace(/^.*\/mean-estemplates\//, '')] = String(file.contents);
    }));
}

function loadSchemas() {
  return gulp.src([paths.schemas])
    .pipe(tap(function(file) {
      memory.schemas[file.path.replace(/^.*\/schemas\//, '')] = String(file.contents);
    }));
}

function loadPackages() {
  return gulp.src(['schemas/*'])
    .pipe(tap(function(file) {
      memory.packages.push(path.basename(file.path));
    }));
};

function generatePackages() {
  
  var packages = memory.packages;
  var templates = Object.keys(memory.templates);

  var streams = [];
  
  packages.forEach(function(package) {
    templates.forEach(function(template) {
      var stream = source(package + '/' path.parse(template).name + '.js');
      var streamEnd = stream;

      var fileContents = 

};

exports.loadTemplates = loadTemplates;
exports.loadSchemas = loadSchemas;
exports.loadPackages = loadPackages;
exports.generatePackages = generatePackages;

var generate = gulp.series(gulp.parallel(loadTemplates, loadSchemas, loadPackages), generatePackages);

gulp.task('generate', generate);

gulp.task('default', gulp.series('generate'));

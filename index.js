// usage: PREFIX=users node --harmony index.js

'use strict';

var path = require('path');
var fs = require('fs');
var chalk = require('chalk');
var promisify = require("es6-promisify");

var error = chalk.bold.red;
var ok = chalk.bold.green;

var dust = require('dustjs-linkedin');
var dustHelpers = require('dustjs-helpers');

var utility = require('./lib/util');
var writeFile = promisify(fs.writeFile);
var readFile = promisify(fs.readFile);
var dustRender = promisify(dust.render);

var original = require('./original.json');
var filePrefix = process.env.PREFIX || 'mkt';

var tpl = path.join(__dirname, 'template/' + filePrefix + '.dust');
var out = path.join(__dirname, 'output/' + filePrefix + '.json');

var jsont = utility.async(function*(alias, filename) {
  var src = yield readFile(filename, 'utf8');
  var compiled = dust.compile(src, alias);
  dust.loadSource(compiled);
  return dustRender(alias, original);
});

function grava(obj) {
  return writeFile(out, JSON.stringify(obj));
}

jsont(filePrefix, tpl)
  .then(JSON.parse)
  .then(grava)
  .then(function() {
    process.stdout.write(ok('\u2714 ') + 'OK' + '\n');
    process.exit(0);
  })
  .catch(function(err) {
    process.stdout.write(error('\u2716 ') + err + '\n');
    process.exit(1);
  });

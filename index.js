'use strict';

var fs = require('fs');
var path = require('path');
var jade = require('jade');

var original = require('./original.json');
var filePrefix = 'mkt';
var tpl = path.join(__dirname, 'template/' + filePrefix + '.jade');
var out = path.join(__dirname, 'output/' + filePrefix + '.json');
var str = fs.readFileSync(tpl, 'utf8');
var fn = jade.compile(str, { filename: tpl });
var output;

function grava(){
 fs.writeFile(out, JSON.stringify(output), function (err) {
    if (err) {
      throw err;
      process.exit(1);
    }
    console.log('Salvo!');
    process.exit()
  });
}

try {
  output = JSON.parse(fn(original));
  grava();
} catch(err) {
  console.log(err);
  process.exit(1);
}

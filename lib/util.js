/* jshint node: true */
/* global require, Promise */

'use strict';

function async(makeGenerator) {
  return function() {
    var generator = makeGenerator.apply(this, arguments);

    // { done: [Boolean], value: [Object] }
    function handle(result) {
      if (result.done) {
        return result.value;
      }

      return result.value.then(function(res) {
        return handle(generator.next(res));
      }, function(err) {
        return handle(generator.throw(err));
      });
    }
    return handle(generator.next());
  };
}

exports.async = async;

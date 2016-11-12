'use strict';
import errors from 'feathers-errors';

module.exports = function() {
  return function(hook) {
    hook.params.query = {
      $sort: { createdAt: -1}
    }
  };
};

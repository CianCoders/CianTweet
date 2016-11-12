'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('tweets service', function() {
  it('registered the tweets service', () => {
    assert.ok(app.service('tweets'));
  });
});

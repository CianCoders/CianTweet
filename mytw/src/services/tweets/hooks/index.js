'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const sort = require('./sort')
const moverServo = require('./moveServo')

exports.before = {
  all: [],
  find: [sort()],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [moverServo()],
  update: [],
  patch: [],
  remove: []
};

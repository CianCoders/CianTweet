'use strict';

const service = require('feathers-mongoose');
const tweets = require('./tweets-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: tweets,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/tweets', service(options));

  // Get our initialize service to that we can bind hooks
  const tweetsService = app.service('/tweets');

  // Set up our before hooks
  tweetsService.before(hooks.before);

  // Set up our after hooks
  tweetsService.after(hooks.after);
};

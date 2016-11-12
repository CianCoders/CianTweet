'use strict';

// tweets-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tweetsSchema = new Schema({
  tweet: { type: String, required: true },
  usuario: { type: String, required: true },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const tweetsModel = mongoose.model('tweets', tweetsSchema);

module.exports = tweetsModel;

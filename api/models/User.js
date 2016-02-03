/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    lastname: {
      type: 'string',
    },
    email: {
      type: 'string',
      unique: true
    },
    encryptedPassword: {
      type: 'string',
    },
    // facebook_auth: {
    //   type: 'integer'
    // },
    role: {
      type: 'string',
      enum: ['player', 'coach'],
      required: true
    },
    state: {
      type: 'string'
    },
    country: {
      type: 'string'
    },
    born: {
      type: 'string'
    },
    phone: {
      type: 'string'
    },
    sport: {
      type: 'json',
      required: true
    },
    membership: {
      type: 'json'
    },
    details: {
      type: 'json'
    }
  }
};

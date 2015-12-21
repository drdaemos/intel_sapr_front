'use strict';

var Backbone = require('backbone');
var _ = require('underscore');

var User = require('scripts/models/User');

var Users = Backbone.Collection.extend({
	model: User,
	key: 'users',
});

_.bindAll(Users, _.functions(Users));

module.exports = Users;
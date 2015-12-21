'use strict';

var Backbone = require('backbone');
var _ = require('underscore');

var User = Backbone.Model.extend({
  	initialize: function(){
	},

	defaults: {
	    id: null,
	    username: '',
	    name: ''
	},

	url: function(){
	    return window.app.API + '/users';
	}

});

_.bindAll(User, _.functions(User));

module.exports = User;
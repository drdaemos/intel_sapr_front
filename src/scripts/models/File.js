'use strict';

var Backbone = require('backbone');
var _ = require('underscore');

var Model = Backbone.Model.extend({
  	initialize: function(){
	},

	defaults: {
	    id: null,
	    deleted: false,
		name: '',
		description: '',
		user_id: null,
		type: '',
		path: ''
	},

	url: function(){
	    return window.app.API + '/texts';
	},
});

_.bindAll(Model, _.functions(Model));

module.exports = Model;
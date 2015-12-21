'use strict';

var Backbone = require('backbone');
var _ = require('underscore');

var Model = Backbone.Model.extend({
  	initialize: function(){
	},

	defaults: {
	    id: null,
		file_id: null,
		key: '',
		value: '',
		group: ''
	},

	url: function(){
	    return window.app.API + '/metrics';
	}

});

_.bindAll(Model, _.functions(Model));

module.exports = Model;
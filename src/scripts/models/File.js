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
		path: '',
		metrics: null
	},

	getMetric: function(key, group) {
		console.log(this);
		var metric = _.findWhere(this.get('metrics'), {group: group, key: key});
		if (!_.isUndefined(metric)) {
			return JSON.parse(metric.value);
		} else return metric;
	},

	url: function(){
	    return window.app.API + '/texts';
	},
});

_.bindAll(Model, _.functions(Model));

module.exports = Model;
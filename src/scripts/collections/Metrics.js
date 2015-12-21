'use strict';

var Backbone = require('backbone');
var _ = require('underscore');

var Metric = require('scripts/models/Metric');

var Metrics = Backbone.Collection.extend({
	model: Metric,
	key: 'metrics',
});

_.bindAll(Metrics, _.functions(Metrics));

module.exports = Metrics;
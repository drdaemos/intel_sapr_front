'use strict';

var React = require('react');
var _ = require('underscore');
var Backbone = require('backbone');
var backboneMixin = require('backbone-react-component');

// CSS

// Images

// Elements

var Component = React.createClass({
  mixins: [backboneMixin],
  getInitialState: function() {
    return {id: _.uniqueId('file-statistics-')};
  },
  parseStatistics: function() {
    var metrics = this.props.data.file.metrics;
  },
  render: function() {
    var data = this.parseStatistics();
    return (
      <div className='ui statistics'>

      </div>
    );
  }
});

module.exports = Component;


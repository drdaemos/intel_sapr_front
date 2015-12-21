'use strict';

var React = require('react');
var _ = require('underscore');
var Events = require('pubsub-js');
var Backbone = require('backbone');
var backboneMixin = require('backbone-react-component');

// CSS

// Images

// Elements
var Widget = require('scripts/components/Widget');
var Select = require('scripts/components/elements/Select');

var Component = React.createClass({
  mixins: [backboneMixin],
  filters: {
    uploaded: 0,
  },
  getInitialState: function() {
    return {id: _.uniqueId('file-filter-')};
  },
  isDataReady: function() {
      return this.props.collection.users.fetched;
  },
  handleFilterChange: function(filter, value) {
    if (!_.isUndefined(value)) {
      this.filters[filter] = value;
    }
    Events.publish('file-filter.changed', this.filters);
  },
  componentDidMount: function() {
    if (!this.isDataReady()) {
        this.showDimmer();
    }
  },
  componentDidUpdate: function() {
    if (this.isDataReady()) {
        this.hideDimmer();
    }
  },
  showDimmer: function() {
      $('#' + this.state.id + ' .ui.dimmer').dimmer('show');
  },
  hideDimmer: function() {
      $('#' + this.state.id + ' .ui.dimmer').dimmer('hide');
  },
  render: function() {
    var users = this.state.users;
    var ready = this.isDataReady();

    var uploaded = {
      onChange: _.partial(this.handleFilterChange, 'uploaded'),
      options: users
              .filter(
                function (user) {
                  return user.deleted != 1;
                }),
      option: 'name',
      initial: {
        value: "0",
        text: "Anyone"
      }
    };

    return (
        <Widget width={'four'} title={'Filters'} id={this.state.id}>
            <div className='ui form'>

              <div className='field'>
                <label>Uploaded by</label>
              {ready
                 ? <Select {...uploaded} />
                 : ''}
              </div>

            </div>
        </Widget>
    );
  }
});

module.exports = Component;


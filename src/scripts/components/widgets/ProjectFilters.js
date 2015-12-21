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
    managed: 0,
    state: 0
  },
  getInitialState: function() {
    return {
      id: _.uniqueId('project-filter-'),
    };
  },  
  isDataReady: function() {
      return this.props.collection.users.fetched
          && this.props.collection.states.fetched;
  },
  handleFilterChange: function(filter, value) {
    if (!_.isUndefined(value)) {
      this.filters[filter] = value;
    }
    Events.publish('project-filter.changed', this.filters);
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
    var states = this.state.states;
    var ready = this.isDataReady();
    //selects
    var managed = {
      onChange: _.partial(this.handleFilterChange, 'managed'),
      options: users
              .filter(
                function (user) {
                  return user.deleted != 1 && user.role_id == 2;
                }),
      option: 'name',
      initial: {
        value: "0",
        text: "Anyone"
      }
    };

    var state = {
      onChange: _.partial(this.handleFilterChange, 'state'),
      options: states,
      option: 'state',
      initial: {
        value: "0",
        text: "Any state"
      }
    };
    return (
        <Widget width={'four'} title={'Filters'} id={this.state.id}>
            <div className='ui form'> 

              <div className='field'>
                <label>Managed by</label>
                {ready 
                 ? <Select {...managed} />
                 : ''}
              </div>

              <div className='field'>
                <label>State</label>
                {ready 
                 ? <Select {...state} />
                 : ''}
              </div>

            </div>
        </Widget>
    );
  }
});

module.exports = Component;


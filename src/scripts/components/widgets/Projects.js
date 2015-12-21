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
  
var Component = React.createClass({
    mixins: [backboneMixin],    
    getInitialState: function() {
        return {id: _.uniqueId('projects-')};
    },  
    isDataReady: function() {
        return this.props.collection.users.fetched
            && this.props.collection.tasks.fetched
            && this.props.collection.states.fetched
            && this.props.collection.projects.fetched;
    },
    onFiltersChanged: function( msg, data ) {
        this.setState({filters: data});
    },
    componentDidMount: function() { 
        this.filterToken = Events.subscribe('project-filter.changed', this.onFiltersChanged); 
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
        var tasks = this.props.collection.tasks;
        var states = this.props.collection.states;
        var users = this.props.collection.users;
        var projects = this.state.projects;
        var filters = this.state.filters;
        var ready = this.isDataReady();
        return (
            <Widget width={'twelve'} title={'Projects'} id={this.state.id}>
                <Component.Toolbar />
                <table className='ui striped table'>
                    <tbody>
                        {ready ?
                            projects
                            .filter(
                                function (project) {
                                    var valid = project.deleted != 1;
                                    if (!_.isUndefined(filters)) {
                                        if (filters.managed != 0) valid = (valid && project.managed_id == filters.managed);
                                        if (filters.state != 0) valid = (valid && project.state_id == filters.state);
                                    }
                                    return valid;
                                })
                            .map(
                                function (project) {
                                    project.manager = users.tryGet(project.managed_id, 'Not managed', 'name');
                                    project.state = states.tryGet(project.state_id, 'Undefined', 'state');
                                    project.tasks = tasks.where({project_id: project.id}).length;
                                    return (<Component.Row project={project} key={project.id} />);
                                }
                            ) : ''
                        }
                    </tbody>
                </table>
            </Widget>
        );
    }
});

Component.Toolbar = React.createClass({
    render: function() {
        return (
            <div className='ui secondary pointing menu'>
              <a className='item' href='#newproject'>
                <i className='add circle icon'></i> New project
              </a>
              <div className='right menu'>
                <div className='item'>
                  <div className='ui transparent icon input'>
                    <input type='text' placeholder='Search...' />
                    <i className='search link icon'></i>
                  </div>
                </div>
              </div>
            </div>
        );
    }
});

Component.Row = React.createClass({
    render: function() {
        return (
            <tr>
                <td>
                    <div className='tag'> {this.props.project.tag} </div>
                </td>
                <td>
                    <div className='content'>
                      <a className='header'> {this.props.project.name} </a>
                      <div className='description'> {this.props.project.description} </div>
                    </div>    
                </td>                
                <td>
                    <div className='managed-by'> {this.props.project.state} </div>
                </td>
                <td>
                    <div className='managed-by'> {this.props.project.manager} </div>
                </td>
                <td>
                    <div className='ui labeled icon button'>
                        <i className='tasks icon'></i> 
                        {this.props.project.tasks}
                    </div> 
                </td>
                <td>
                    <div className='ui labeled icon button'>
                        <i className='file icon'></i> 
                        0
                    </div> 
                </td>
            </tr>
        );
    }
});

module.exports = Component;


'use strict';

var React = require('react');
var _ = require('underscore');
var Backbone = require('backbone');
var backboneMixin = require('backbone-react-component');

// CSS

// Images

// Elements
var Widget = require('scripts/components/Widget');
  
var Component = React.createClass({
    mixins: [backboneMixin],
    getInitialState: function() {
        return {
            id: _.uniqueId('profile-'),
        };
    },  
    isDataReady: function() {
        return this.props.collection.users.fetched
            && this.props.collection.roles.fetched;
    },
    componentDidMount: function() {  
        if (!this.isDataReady()) {
            this.showDimmer();
        } 
    },
    componentWillUpdate: function() {
        if (this.isDataReady()) {  
            var username = !_.isNull(this.props.query.user) ? this.props.query.user : window.app.session.user.get('username');
            if (_.isUndefined(this.props.collection.users.findWhere({username: username}))) {
                window.app.router.notFound();
            }
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
        var roles = this.props.collection.roles;
        var users = this.state.users;
        var ready = this.isDataReady();
        if (ready) {
            var username = !_.isNull(this.props.query.user) ? this.props.query.user : window.app.session.user.get('username');
            var user = _.findWhere(users, {username: username});
            if (!_.isUndefined(user)) {
                user.role = this.props.collection.roles.tryGet(user.role_id, 'Undefined', 'role');
            }
        }
        return (
            <Widget width={'twelve'} title={'Profile'} id={this.state.id}>
                <div className='ui stackable grid'>
                        {ready && !_.isUndefined(user)
                            ? <Component.Profile user={user} />
                            : ''
                        }
                </div>
            </Widget>
        );
    }
});

Component.Profile = React.createClass({
    render: function() {
        return (
            <div className='row'>
                <Component.Profile.Avatar {...this.props} />
                <Component.Profile.Data {...this.props} />
            </div>
        );
    }
});

Component.Profile.Avatar = React.createClass({
    render: function() {
        return (
            <div className='six wide column'>
                <img className='ui rounded centered image' 
                     src={this.props.user.avatar_large} />
            </div>
        );
    }
});

Component.Profile.Data = React.createClass({
    render: function() {
        return (
            <div className='ten wide column'>
                <h1 className='ui dividing header'> 
                {this.props.user.name}
                <div className='sub header'> {this.props.user.role} </div>
                </h1>
                <table className='ui very basic table'>
                  <tbody>
                    <tr>
                      <td><i className='mail icon'></i>E-mail</td>
                      <td>{this.props.user.username + '@gmail.com'}</td>
                    </tr>

                    <tr>
                      <td><i className='call icon'></i>Phone</td>
                      <td>+7 (123) 456-78-90</td>
                    </tr>
                  </tbody>
                </table>
            </div>
        );
    }
});

module.exports = Component;


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
        return {id: _.uniqueId('files-')};
    },
    isDataReady: function() {
        return this.props.collection.users.fetched
            && this.props.collection.files.fetched;
    },
    onFiltersChanged: function( msg, data ) {
        this.setState({filters: data});
    },
    componentDidMount: function() {
        this.filterToken = Events.subscribe('file-filter.changed', this.onFiltersChanged);
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
        var files = this.state.files;
        var users = this.props.collection.users;
        var filters = this.state.filters;
        var ready = this.isDataReady();
        return (
            <Widget width={'twelve'} title={'Files'} id={this.state.id}>
                <table className='ui striped table'>
                    <tbody>
                        {ready ?
                            files
                            .filter(
                                function (file) {
                                    // var valid = file.deleted != 1;
                                    var valid = true;
                                    if (!_.isUndefined(filters)) {
                                        if (filters.uploaded != 0) valid = (valid && file.user_id == filters.uploaded);
                                    }
                                    return valid;
                                })
                            .map(
                                function (file) {
                                    file.uploader = users.tryGet(file.uploaded_by, 'Not uploaded', 'name');
                                    return (<Component.Row file={file} key={file.id} />);
                                }
                            ) : ''
                        }
                    </tbody>
                </table>
            </Widget>
        );
    }
});

Component.Row = React.createClass({
    render: function() {
        return (
            <tr>
                <td>
                    <div className='content'>
                      <a className='header' href={'#file/' + this.props.file.id}> {this.props.file.name} </a>
                      <div className='description'> {this.props.file.description} </div>
                    </div>
                </td>
                <td>
                    <div className='content'>
                        {this.props.file.path}
                    </div>
                </td>
                <td>
                    <div className='content'>
                        {this.props.file.type}
                    </div>
                </td>
            </tr>
        );
    }
});
module.exports = Component;


'use strict';

var React = require('react');
var _ = require('underscore');
var Backbone = require('backbone');
var backboneMixin = require('backbone-react-component');

// CSS

// Images

// Elements
var Widget = require('scripts/components/Widget');
var Dropzone = require('react-dropzone');

var Component = React.createClass({
  mixins: [backboneMixin],
  formName: 'fileform-form',
  getInitialState: function() {
      return {id: _.uniqueId('fileform-')};
  },
  isDataReady: function() {
      return this.props.collection.files.fetched;
  },
  addFormActions: function() {
      var rules = {
        name: {
          identifier  : 'name',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter file name'
            }
          ]
        },
      };

      var settings = {
        onSuccess: this.handleFormSubmit
      };

      $('#' + this.formName).form(rules, settings);
  },

  onDrop: function (files) {
    var self = this;
    this.props.collection.files.upload(
      files,
      function(data) {
        self.setState({
          file: data.file
        });
      },
      function() {
        alert('error');
      }
    );
  },

  handleFormSubmit: function(e) {
    e.preventDefault();
    var name = React.findDOMNode(this.refs.name).value.trim();
    var description = React.findDOMNode(this.refs.description).value.trim();
    var file = this.state.file;
    if (!name || !file) {
      return;
    }
    var formElem = '#' + this.formName;
    this.props.collection.files.create(
      {
        name: name,
        description: description,
        path: file,
        user_id: window.app.session.user.get('id')
      }
    );
    window.app.router.navigate('#files', {trigger: true});
  },
  componentDidMount: function() {
      if (!this.isDataReady()) {
          this.showDimmer();
      }
      this.addFormActions();
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
    return (
        <Widget width={'sixteen'} title={'New file'}>
            <form className='ui form' id={this.formName} >

              <div className='fields'>
                <div className='required sixteen wide field'>
                  <label>File name</label>
                  <div className='ui input'>
                    <input type='text' placeholder='Project name' name='name' ref='name' />
                  </div>
                </div>
              </div>
              <div className='two fields'>
                <div className='ten wide field'>
                  <label>Description</label>
                  <div className='ui input'>
                    <textarea name='description' ref='description' placeholder='Description'></textarea>
                  </div>
                </div>
                <div className='six wide field'>
                  <Dropzone onDrop={this.onDrop} multiple={false} >
                    <div>Try dropping file here, or click to select file to upload.</div>
                  </Dropzone>
                </div>

              </div>

              <div className='ui error message'>
                <div className='header'>We`ve noticed some issues</div>
              </div>
              <div className='ui submit button'>Create</div>

            </form>
        </Widget>
    );
  }
});

module.exports = Component;


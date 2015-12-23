'use strict';

var React = require('react');
var _ = require('underscore');
var Backbone = require('backbone');
var backboneMixin = require('backbone-react-component');

// CSS
require('styles/widget/file.less');

// Images

// Elements
var Widget = require('scripts/components/Widget');
var Statistics = require('scripts/components/widgets/File/Statistics');

var Component = React.createClass({
  mixins: [backboneMixin],
  getInitialState: function() {
      return {id: _.uniqueId('file-')};
  },
  isDataReady: function() {
      return this.props.collection.users.fetched
          && this.props.collection.files.fetched;
  },
  componentDidMount: function() {
      if (!this.isDataReady()) {
        this.showDimmer();
      } else {
        var data = this.getDataFromQuery();
        if(_.isUndefined(data)){
          window.app.router.notFound();
        }
      }
  },
  componentDidUpdate: function() {
      if (this.isDataReady()) {
        this.hideDimmer();
      }
  },
  getDataFromQuery: function() {
      var file = this.props.collection.files.findWhere({
          id: parseInt(this.props.query.file)
      });
      if (!_.isUndefined(file)) {
        var uploader = this.props.collection.users.tryGet(file.get('user_id'), 'Unknown');
        var users = this.props.collection.users;
        var metrics = file.get('metrics');
        return {
          file: file,
          metrics: metrics,
          uploader: uploader,
          users: users
        };
      } else return;
  },
  showDimmer: function() {
      $('#' + this.state.id + ' .ui.dimmer').dimmer('show');
  },
  hideDimmer: function() {
      $('#' + this.state.id + ' .ui.dimmer').dimmer('hide');
  },
  render: function() {
    var title = 'File';
    var ready = this.isDataReady();
    var data = this.getDataFromQuery();
    if (ready && !_.isUndefined(data)) {
      var title = data.file.get('name');
    }
    return (
	    <Widget width={'sixteen'} title={title}>
          {ready
            ?
            <div className='ui grid'>
              <div className='row'>
                <Component.Description data={data} />
                <Component.Properties data={data} />
              </div>
              <div className='row'>
                <Component.Statistics data={data} />
              </div>
            </div>
            :
            <div className='ui grid'>
              <div className='row'>
                <p>Please wait while data is being loaded </p>
              </div>
            </div>
          }
	    </Widget>
    );
  }
});

Component.Properties = React.createClass({
  render: function() {
    var uploader = (this.props.data.uploader instanceof Backbone.Model)
        ? this.props.data.uploader.get('name')
        : this.props.data.uploader;

    var keywords = this.props.data.file.getMetric('keywords', 'summarize');
    return (
      <div className='six wide column'>
        <h3 className='ui dividing header'>File info</h3>
        <table className='ui very basic table'>
          <tbody>
            <tr className="top aligned">
              <td>Uploader</td>
              <td>{uploader}</td>
            </tr>
            <tr className="top aligned">
              <td>Keywords</td>
              <td>{keywords.join(', ')}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
});

Component.Description = React.createClass({
  render: function() {
    var summary = this.props.data.file.getMetric('summary', 'summarize');
    console.log(summary);
    return (
      <div className='ten wide column'>
        <div className='ui basic segment'>
          {this.props.data.file.get('description')}
        </div>

        <div className='ui segment summary'>
          <blockquote>
            {summary.map(
              function(paragraph) {
                return (<p>{paragraph.sentence}</p>);
              })
            }
          </blockquote>
        </div>
      </div>
    );
  }
});

Component.Statistics = React.createClass({
  render: function() {
    return (
      <div className='sixteen wide column'>
        <h3 className='ui dividing header'>Text statistics</h3>
        <Statistics {...this.props} />
      </div>
    );
  }
});

module.exports = Component;


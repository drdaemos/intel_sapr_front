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
      return {id: _.uniqueId('tasks-')};
  },  
  isDataReady: function() {
      return this.props.collection.users.fetched
          && this.props.collection.tasks.fetched
          && this.props.collection.states.fetched
          && this.props.collection.projects.fetched
          && this.props.collection.comments.fetched;
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
    var query = this.splitTag(this.props.query.tag);
    var project = this.props.collection.projects.findWhere({tag: query.project});

    if (!_.isUndefined(project)) {
        var task = this.props.collection.tasks.findWhere({
          id: query.task, project_id: project.get('id') 
        });
      if (!_.isUndefined(task)) {
        var state = this.props.collection.states.tryGet(task.get('state_id'), 'Undefined');
        var assignee = this.props.collection.users.tryGet(task.get('assigned_id'), 'Not assigned');
        var comments = this.props.collection.comments;
        var users = this.props.collection.users;
        return {
          task: task,
          project: project,
          state: state,
          assignee: assignee,
          comments: comments,
          users: users
        };
      } else return;
    } else return;
  },
  splitTag: function(tag) {
    return {
      project: tag.split('-',2)[0],
      task: tag.split('-',2)[1],      
    };
  },
  showDimmer: function() {
      $('#' + this.state.id + ' .ui.dimmer').dimmer('show'); 
  },
  hideDimmer: function() {
      $('#' + this.state.id + ' .ui.dimmer').dimmer('hide'); 
  },
  render: function() {
    var title = 'Task';    
    var ready = this.isDataReady();
    var data = this.getDataFromQuery();
    if (ready && !_.isUndefined(data)) {
      var title = data.project.get('tag') + '-' + data.task.get('id') + ' ' + data.task.get('name');
    }
    return (
	    <Widget width={'sixteen'} title={title}>
        <div className='ui grid'>
          {ready 
            ?
            <div className='row'>
              <Component.Description data={data} />
              <Component.Properties data={data} />              
            </div> 
            :
            <div className='row'>
              <p>Please wait while data is being loaded </p>
            </div> 
          }
        </div>
	    </Widget>
    );
  }
});

Component.Properties = React.createClass({
  render: function() {
    var date = new Date(this.props.data.task.get('started_date')).toDateString();
    var estimation = this.props.data.task.get('estimation') + ' minutes'; 
    var progress = this.props.data.task.get('progress') + ' minutes'; 
    return (
      <div className='six wide column'>
        <h3 className='ui dividing header'>Task info</h3>
        <table className='ui very basic table'>
          <tbody>
            <tr>
              <td>State</td>
              <td>{this.props.data.state.get('state')}</td>
            </tr>

            <tr>
              <td>Assigned to</td>
              <td>{this.props.data.assignee.get('name')}</td>
            </tr>

            <tr>
              <td>Started</td>
              <td>{date}</td>
            </tr>

            <tr>
              <td>Estimation</td>
              <td>{estimation}</td>
            </tr>

            <tr>
              <td>Progress</td>
              <td>{progress}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
});

Component.Description = React.createClass({
  render: function() {
    return (
      <div className='ten wide column'>
        <div className='ui basic segment'>
          {this.props.data.task.get('description')}
        </div>
        <Component.Comments {...this.props} />
      </div>
    );
  }
});

Component.Comments = React.createClass({
  formName: 'comment-form',
  addFormActions: function() {
      var rules = {
        name: {
          identifier  : 'comment',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter comment text'
            }
          ]
        },
      };

      var settings = {
        onSuccess: this.handleFormSubmit
      };

      $('#' + this.formName).form(rules, settings);
  },
  componentDidMount: function () {    
      this.addFormActions();
  },
  handleFormSubmit: function(e) {
    e.preventDefault();
    var comment = React.findDOMNode(this.refs.comment).value.trim();    
    if (!comment) {
      return;
    }
    console.log(this);
    var formElem = '#' + this.formName;
    this.props.data.comments.create(
      {        
        message: comment, 
        task_id: this.props.data.task.get('id'), 
        created_id: window.app.session.user.get('id'),
        created_date: Math.floor(+new Date()/1000)
      }
    ); 
    $(formElem).form('reset');

  },
  render: function() {    
    var users = this.props.data.users;
    var task = this.props.data.task;
    return (
        <div className='ui comments'>
          <h3 className='ui dividing header'>Comments</h3>
          {
            this.props.data.comments
            .filter(
                function (comment) {                    
                    return comment.get('task_id') == task.get('id');
                })
            .map(
                function (comment) {
                    comment.user = users.tryGet(comment.get('created_id'), 'WTF?');
                    return (<Component.Comments.Item message={comment} key={comment.get('id')} />);
                }
            )
          }     
          
          <form className='ui reply form' id={this.formName}>
            <div className='field'>
              <textarea ref='comment' name='comment'></textarea>
            </div>
            <div className='ui blue labeled submit icon button'>
              <i className='icon edit'></i> Add Reply
            </div>
          </form>
        </div>
    );
  }
});

Component.Comments.Item = React.createClass({
  render: function() {
    return (
      <div className='comment'>
        <a className='avatar'>
          <img src={this.props.message.user.get('avatar_small')}/>
        </a>
        <div className='content'>
          <a className='author'>{this.props.message.user.get('name')}</a>
          <div className='metadata'>
            <span className='date'>{this.props.message.get('date')}</span>
          </div>
          <div className='text'>
            <p>{this.props.message.get('message')}</p>
          </div>
          <div className='actions'>
            <a className='reply'>Reply</a>
          </div>
        </div>    
      </div>
    );
  }
});

module.exports = Component;


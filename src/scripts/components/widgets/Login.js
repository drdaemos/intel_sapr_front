'use strict';

var React = require('react');
var _ = require('underscore');

// CSS

// Images

// Elements
var Widget = require('scripts/components/Widget');
  
var Component = React.createClass({
  formName: 'login-form',
  addFormActions: function() {
      var rules = {
        name: {
          identifier  : 'name',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter your name'
            }
          ]
        },
        gender: {
          identifier  : 'password',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter a password'
            },
            {
              type   : 'length[6]',
              prompt : 'Your password must be at least 6 characters'
            }
          ]
        },
      };

      var settings = {
        onSuccess: this.tryLogin
      };

      $('#' + this.formName).form(rules, settings);
  },
  tryLogin: function(e) {
    e.preventDefault();
    console.log(e.target);
    var name = React.findDOMNode(this.refs.name).value.trim();
    var pwd = React.findDOMNode(this.refs.password).value.trim();
    if (!name || !pwd) {
      return;
    }
    var formElem = '#' + this.formName;
    window.app.session.login({
      username: name,
      password: pwd
    }, {
      success: function(res){
          window.app.router.navigate("dashboard", { trigger: true });
      }, 
      error: function(res){
          console.log(res);
          $(formElem).removeClass('success');
          $(formElem).addClass('error');
          $(formElem).form('add errors', [res.error]);
      }
    });
  },
  componentDidMount: function() {
      this.addFormActions();
  },
  render: function() {
    return (
        <Widget width={'six'} title={'Login'}>
            <form className='ui form' id={this.formName} > 

              <div className='required field'>
                <label>Username</label>
                <div className='ui icon input'>
                  <input type='text' placeholder='Username' name='name' ref='name' />
                  <i className='user icon'></i>
                </div>
              </div>
              <div className='required field'>
                <label>Password</label>
                <div className='ui icon input'>
                  <input type='password' placeholder='Password' name='password' ref='password' />
                  <i className='lock icon'></i>
                </div>
              </div>

              <div className='ui error message'>
                <div className='header'>We noticed some issues</div>
              </div>
              <div className='ui submit button'>Login</div>

            </form>
        </Widget>
    );
  }
});

module.exports = Component;


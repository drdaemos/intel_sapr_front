'use strict';

var React = require('react');
var _ = require('underscore');
var Backbone = require('backbone');
var backboneMixin = require('backbone-react-component');

// CSS
require('styles/header.less');
  
var Header = React.createClass({
  render: function() {
    return (
	    <header className='row'>
	      	<div className='wide column'>
		      	<Header.Navbar />
		      	<Header.NavbarMobile />
	      	</div>
	    </header>
    );
  }
});

Header.Navbar = React.createClass({
	getInitialState: function() {
	    return {
	    	id: _.uniqueId('header-navbar-')
	    };
	},
	componentDidMount: function() {	
        $('#' + this.state.id + ' .right.menu .dropdown').dropdown({
        	action: 'hide'
        });
	},
	componentDidUpdate: function() {
        $('#' + this.state.id + ' .right.menu .dropdown').dropdown({
        	action: 'hide'
        });
	},
  	render: function() {  
	  	var userButton;
		if (window.app.session.get('logged_in')) {
		  userButton = <Header.Navbar.User />;
		} else {
		  userButton = <Header.Navbar.Anonymous />;
		}		
	    return (
			<div className='ui computer tablet only stackable navbar menu inverted page grid' id={this.state.id}>
		  		<a className='launch item active' href='#files'>
			      <span> Files </span>
			    </a>
			    <a className='item' href='#file/create'>
			      <span> Upload </span>
			    </a>
			    {userButton}
			</div>
	    );
  	}
});

Header.NavbarMobile = React.createClass({
	getInitialState: function() {
	    return {
	    	id: _.uniqueId('header-navbarmobile-')
	    };
	},
	componentDidMount: function() {	
        $('#' + this.state.id + '.accordion').accordion();
	},
	componentDidUpdate: function() {
        $('#' + this.state.id + '.accordion').accordion('refresh');
	},
  	render: function() {  
	  	var userButton;
		if (window.app.session.get('logged_in')) {
		  userButton = <Header.NavbarMobile.User />;
		} else {
		  userButton = <Header.NavbarMobile.Anonymous />;
		}		
	    return (
			<div className='ui accordion mobile only fluid vertical navbar menu inverted grid' id={this.state.id}>
				<div className='fitted item'>			
		    		<div className='title'>
				      	<img className="ui centered image brand" src='/images/logo-brand.png' />
				    </div>
				    <div className='content'>
				  		<a className='launch item active' href='#files'>
					      <span> Files </span>
					    </a>
					    <a className='item' href='#file/create'>
					      <span> Upload </span>
					    </a>
				    	{userButton}
				    </div>
			    </div>
			</div>
	    );
  	}
});


Header.Navbar.User = React.createClass({
 	mixins: [backboneMixin],
  	render: function() {
	    return (
			<div className='right menu'>
			    <div className="ui dropdown item">
				  	<div className="text user">{window.app.session.user.get('name')}</div>
				  	<i className="dropdown icon"></i>
				  	<div className="menu">
					    <a className="item" href="#profile">Profile</a>
					    <a className="item" href="#logout">Logout</a>
				  	</div>
				</div>			
			</div>
	    );
	}
});

Header.NavbarMobile.User = React.createClass({
 	mixins: [backboneMixin],
  	render: function() {
	    return (
  			<div className='item'>
			  	<div className="text user">{window.app.session.user.get('name')}</div>
			  	<div className="menu">
				    <a className="item" href="#profile">Profile</a>
				    <a className="item" href="#logout">Logout</a>
			  	</div>
			</div>
	    );
	}
});

Header.Navbar.Anonymous = React.createClass({
  	render: function() {
	    return (
			<div className='right menu'>
			    <a className='item' href='#login'>
			      <span> Login </span>
			    </a>
			    <a className='item' href='#signup'>
			      <span> Signup </span>
			    </a>		
			</div>
	    );
	}
});

Header.NavbarMobile.Anonymous = React.createClass({
  	render: function() {
	    return (	    	
  			<div className='item'>
    			<a><b>Not logged in</b></a>
				<div className='menu'>
				    <a className='item' href='#login'>
				      <span> Login </span>
				    </a>
				    <a className='item' href='#signup'>
				      <span> Signup </span>
				    </a>		
				</div>
			</div>
	    );
	}
});

module.exports = Header;


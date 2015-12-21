'use strict';

var React = require('react');
var _ = require('underscore');

// CSS

// Images

// Elements
var Page = require('scripts/components/Page');
var Profile = require('scripts/components/widgets/Profile');

var Component = React.createClass({
  render: function() {  	 	
  	var data = {
  		roles: window.app.collections.roles,
  		users: window.app.collections.users,
  	};
    return (
	    <Page>
	    	<div className='row'>
		    	<div className='wide column'>
		    		<div className='ui centered grid stackable'>
		    			<Profile collection={data} query={this.props.query} />
		    		</div>
		    	</div>
	    	</div>
	    </Page>
    );
  }
});

module.exports = Component;


'use strict';

var React = require('react');
var _ = require('underscore');

// CSS

// Images

// Elements
var Page = require('scripts/components/Page');
var OpenedTasks = require('scripts/components/widgets/OpenedTasks');
var Recents = require('scripts/components/widgets/Recents');
  
var Component = React.createClass({
  render: function() {  	 	
  	var data = {
  		tasks: window.app.collections.tasks,
  		states: window.app.collections.taskStates,
  		users: window.app.collections.users,
  		projects: window.app.collections.projects,
  	};
    return (
	    <Page>
	    	<div className='row'>
		    	<div className='wide column'>
		    		<div className='ui grid stackable'>
		    			<OpenedTasks collection={data} />
		    			<Recents />
		    		</div>
		    	</div>
	    	</div>
	    </Page>
    );
  }
});

module.exports = Component;


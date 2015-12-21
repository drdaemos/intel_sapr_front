'use strict';

var React = require('react');
var _ = require('underscore');

// CSS

// Images

// Elements
var Page = require('scripts/components/Page');
var Projects = require('scripts/components/widgets/Projects');
var ProjectFilters = require('scripts/components/widgets/ProjectFilters');
  
var Component = React.createClass({
  render: function() {  	
  	var data = {
  		tasks: window.app.collections.tasks,
  		states: window.app.collections.projectStates, 
  		users: window.app.collections.users,
  		projects: window.app.collections.projects,
  	};
    return (
	    <Page>
	    	<div className='row'>
		    	<div className='wide column'>
		    		<div className='ui grid stackable'>
		    			<ProjectFilters collection={data} />
		    			<Projects collection={data} />
		    		</div>
		    	</div>
	    	</div>
	    </Page>
    );
  }
});

module.exports = Component;


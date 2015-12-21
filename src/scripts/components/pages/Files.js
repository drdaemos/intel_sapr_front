'use strict';

var React = require('react');
var _ = require('underscore');

// CSS

// Images

// Elements
var Page = require('scripts/components/Page');
var Files = require('scripts/components/widgets/Files');
var FileFilters = require('scripts/components/widgets/FileFilters');

var Component = React.createClass({
  render: function() {
  	var data = {
      files: window.app.collections.files,
      users: window.app.collections.users,
  	};
    return (
	    <Page>
	    	<div className='row'>
		    	<div className='wide column'>
		    		<div className='ui grid stackable'>
		    			<FileFilters collection={data} />
		    			<Files collection={data} />
		    		</div>
		    	</div>
	    	</div>
	    </Page>
    );
  }
});

module.exports = Component;


'use strict';

var React = require('react');
var _ = require('underscore');

// CSS

// Images

// Elements
var Page = require('scripts/components/Page');
var File = require('scripts/components/widgets/File');

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
		    			<File collection={data} query={this.props.query} />
		    		</div>
		    	</div>
	    	</div>
	    </Page>
    );
  }
});

module.exports = Component;


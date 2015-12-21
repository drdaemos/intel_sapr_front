'use strict';

var React = require('react');
var _ = require('underscore');

// CSS

// Images

// Elements
var Page = require('scripts/components/Page');
  
var Component = React.createClass({
  render: function() {
    return (
	    <Page>
	    	<div className='row'>
		    	<div className='wide column'>
		    		<div className='ui basic segment'>
	    				<div className='ui large header'> Sorry, pal, this page is not available.</div>		
	    				<p> Either you do not have access to this page or it does not exist. </p>	
	    				<p> Try to look elsewhere. </p>	
		    		</div>
		    	</div>
	    	</div>
	    </Page>
    );
  }
});

module.exports = Component;


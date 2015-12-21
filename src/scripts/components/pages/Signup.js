'use strict';

var React = require('react');
var _ = require('underscore');

// CSS

// Images

// Elements
var Page = require('scripts/components/Page');
var Signup = require('scripts/components/widgets/Signup');
  
var Component = React.createClass({
  render: function() {
    return (
	    <Page>
	    	<div className='row'>
		    	<div className='wide column'>
		    		<div className='ui centered grid stackable'>
		    			<Signup />
		    		</div>
		    	</div>
	    	</div>
	    </Page>
    );
  }
});

module.exports = Component;


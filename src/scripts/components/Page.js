'use strict';

var React = require('react');
var _ = require('underscore');

// CSS
require('styles/page.less');

// Images

// Elements
  
var Page = React.createClass({
  render: function() {  	
    return (
	    <section className='row'>
    		<div className='ui page grid'>
				{ this.props.children }
			</div>
	    </section>
    );
  }
});

module.exports = Page;


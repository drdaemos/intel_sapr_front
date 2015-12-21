'use strict';

var React = require('react');
var _ = require('underscore');

// CSS
require('styles/widget.less');

// Images

// Elements
  
var Widget = React.createClass({
  render: function() {
  	var classes = this.props.width + ' wide column';
    return (
	    <div className={classes} id={this.props.id}>
    		<div className='ui segment dimmable widget'>
	    		<div className='ui dividing large header'>{ this.props.title }</div>
				{ this.props.children }
				<div className='ui inverted dimmer'>
				    <div className='ui loader'></div>
				</div>
			</div>
	    </div>
    );
  }
});

module.exports = Widget;


'use strict';

var React = require('react');
var _ = require('underscore');
var Backbone = require('backbone');
var backboneMixin = require('backbone-react-component');

// CSS

// Images

// Elements
var Widget = require('scripts/components/Widget');
  
var Component = React.createClass({
    mixins: [backboneMixin],
    getInitialState: function() {
        return {id: _.uniqueId('recents-')};
    },  
    isDataReady: function() {
        return true;
    },
    componentDidMount: function() {  
        if (!this.isDataReady()) {
            this.showDimmer();
        }
    },
    componentDidUpdate: function() { 
        if (this.isDataReady()) {   
            this.hideDimmer();
        }
    },  
    showDimmer: function() {
        $('#' + this.state.id + ' .ui.dimmer').dimmer('show'); 
    },
    hideDimmer: function() {
        $('#' + this.state.id + ' .ui.dimmer').dimmer('hide'); 
    },
    render: function() {
        return (
            <Widget width={'six'} title={'Recent Activity'} id={this.state.id}>
                <div className='ui feed'>
                  <div className='event'>
                    <div className='label'>
                      <img src='/images/avatar/small/1.jpg' />
                    </div>
                    <div className='content'>
                      <div className='summary'>
                        <a className='user' href='#profile/qwerty'>
                          Vasya
                        </a> started new task
                        <a href='#task/DRAFT-1'> DRAFT-1 </a>
                        <div className='date'>
                          14 days ago
                        </div>
                      </div>
                      <div className='meta'>
                        <a href='#project/DRAFT'>
                          <i className='tag icon'></i> DRAFT
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className='event'>
                    <div className='label'>
                      <i className='pencil icon'></i>
                    </div>
                    <div className='content'>
                      <div className='summary'>
                        You were assigned to task
                        <a href='#tasks/DRAFT-1'> DRAFT-1 </a>        
                        <div className='date'>
                          14 days ago
                        </div>
                      </div>
                      <div className='meta'>
                        <a href='#project/DRAFT'>
                          <i className='tag icon'></i> DRAFT
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className='event'>
                    <div className='label'>
                      <img src='/images/avatar/small/1.jpg' />
                    </div>
                    <div className='content'>
                      <div className='summary'>
                        <a href='#profile/qwerty'>Vasya</a> added <a>new comment</a>                        
                        <div className='date'>
                            4 days ago
                        </div>
                      </div>
                      <div className='extra text'>
                        Testing comment #1
                      </div>
                      <div className='meta'>
                        <a href='#task/DRAFT-1'>
                          <i className='tag icon'></i> DRAFT-1
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
            </Widget>
        );
    }
});

module.exports = Component;


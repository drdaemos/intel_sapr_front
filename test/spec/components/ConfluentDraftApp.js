'use strict';

describe('Main', function () {
  var React = require('react/addons');
  var ConfluentDraftApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    ConfluentDraftApp = require('../../../src/scripts/components/ConfluentDraftApp.js');
    component = React.createElement(ConfluentDraftApp);
  });

  it('should create a new instance of ConfluentDraftApp', function () {
    expect(component).toBeDefined();
  });
});

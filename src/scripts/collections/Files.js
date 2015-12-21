'use strict';

var Backbone = require('backbone');
var _ = require('underscore');

var File = require('scripts/models/File');

var Files = Backbone.Collection.extend({
	model: File,
	key: 'texts',

	upload: function(files, success, fail) {
		var data = new FormData();
	    data.append('file', files[0]);

	    var url = window.app.API + '/upload';
	    console.log(url);

	    $.ajax({
	        url: url,
	        method: 'POST',
	        data: data,
	        dataType: 'json',
	        cache: false,
	        processData: false,
	        contentType: false
	    }).done(success).fail(fail);
	}
});

_.bindAll(Files, _.functions(Files));

module.exports = Files;
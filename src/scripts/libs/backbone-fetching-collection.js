var Backbone = require('backbone');
var _ = require('underscore');

_.extend(Backbone.Collection.prototype, {
    fetched: false,
    key: '',

    parse: function(data) {
        return data[this.key];
    },

    url: function(){
        return window.app.API + '/' + this.key;
    },

    initialize: function(){
        this.fetchWithCallbacks();

        setInterval(_.bind(this.fetchWithCallbacks, this), 5000);
    },

    canFetch: function () {
        return window.app.session.get('logged_in');
    },

    tryGet: function (id, defaultValue, field) {
    	if (!_.isUndefined(this.get(id))) {
    		if (!_.isUndefined(field) && !_.isUndefined(this.get(id).get(field))) {
    			return this.get(id).get(field);
    		} else {
    			return this.get(id);
    		}
    	} else {
    		return defaultValue;
    	}
    },

    fetchWithCallbacks: function () {
        if (this.canFetch()) {
            this.fetch({
                success: this.fetchSuccess,
                error: this.fetchError
            });
        }
    },

    fetchSuccess: function (collection, response) {
    	collection.fetched = true;
    	collection.trigger('update');
        console.log('Collection models: ', collection.models);
    },

    fetchError: function (collection, response) {
        throw new Error("Tasks fetch error");
    }
});
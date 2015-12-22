'use strict';

var React = require('react');
var Backbone = require('backbone');
var _ = require('underscore');
var Application = require('scripts/components/Application');
var Router = Backbone.Router.extend({
    el: 'page',
    initialize: function(){
    },

    show: function(options){
        var props = {
            page: options.page,
            query: options.query
        };

        if (typeof options !== 'undefined' && options.requiresAuth){
            var self = this;
            window.app.session.checkAuth({
                success: function(res){
                    // If auth successful, render inside the page wrapper
                    React.render(<Application {...props} key={props.page}/>, document.getElementById(self.el));
                }, error: function(res){
                    self.navigate("login", { trigger: true });
                }
            });

        } else {
            React.render(<Application {...props} />, document.getElementById(this.el));
        }
    },

    routes: {
        "": "start", // Пустой hash-тэг
        "login": "login",
        "logout": "logout",
        "signup": "signup",
        "files": "files",
        "file/create": "createfile",
        "file/:id": "file",
        "profile(/:user)": "profile",
        "*path": "notFound"
    },

    start: function () {
        this.show({
            page: 'Files'
        });
    },

    files: function () {
        this.show({
            page: 'Files'
        });
    },

    file: function (id) {
        this.show({
            page: 'File',
            query: {
                file: id
            }
        });
    },

    createfile: function () {
        this.show({
            page: 'CreateFile'
        });
    },

    profile: function (user) {
        this.show({
            page: 'Profile',
            requiresAuth: true,
            query: {
                user: user
            }
        });
    },

    login: function () {
        this.show({
            page: 'Login'
        });
    },

    logout: function () {
        window.app.session.logout({}, {
          success: function(res){
              window.app.router.navigate("login", { trigger: true });
          }
        });
    },

    signup: function () {
        this.show({
            page: 'Signup'
        });
    },

    notFound: function () {
        this.show({
            page: 'NotFound'
        });
    }

});

_.bindAll(Router, _.functions(Router));

module.exports = Router;
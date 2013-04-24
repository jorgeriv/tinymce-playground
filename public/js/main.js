// RequireJS configuration options
requirejs.config({
	shim: {
		'backbone': {
			deps: ['jquery', 'underscore'],
			exports: 'Backbone'
		},

		'underscore': {
			exports: '_'
		},

		'hogan': {
			exports: 'Hogan'
		},

		'tinymce': {
			exports: 'tinymce'
		},

		'jquery.tinymce': {
			deps: ['jquery'],
			exports: 'jQuery.fn.tinymce'
		},

		'bootstrap': ['jquery']
	},

	paths: {
		backbone: 'http://cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.2/backbone-min',
		underscore: 'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min',
		hogan: 'http://cdnjs.cloudflare.com/ajax/libs/hogan.js/2.0.0/hogan',
		tinymce: 'tinymce/jscripts/tiny_mce/tiny_mce',
		'jquery.tinymce' : 'tinymce/jscripts/tiny_mce/jquery.tinymce',
		bootstrap: 'bootstrap.min',
		app: '../app'
	},

	baseUrl: 'js/lib'
});

// Here is where the magic begins
require(['jquery', 'backbone', 'hogan', 'app/rteMonitor', 'tinymce', 'jquery.tinymce', ], function($, Backbone, hogan, monitor, tinymce) {
	var Router = Backbone.Router.extend({
		routes: {
			'popup': 'popup',
			'*default': 'default'
		}
	}),
		router = new Router;

	router.on('route:popup', function() {
		alert('Pop-up');

	});
	router.on('route:default', function() {

	});

	Backbone.history.start({
		pushState: true
	});
/*
	tinymce.init({
	       mode : "none",
	       theme : "simple"
	});

	tinymce.execCommand('addControls', false, 'inst1');
*/
	$('#inst1').tinymce({
		mode: "none",
		theme: "simple"
	});

});
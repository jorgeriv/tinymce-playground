requirejs.config({
	shim : {
		'backbone' : {
			deps : ['jquery', 'underscore'],
			exports : 'Backbone'
		},
		'underscore' : {
			exports : '_'
		},
		'hogan' : {
			exports : 'Hogan'
		},
		'tinymce' : {
			exports : 'tinymce'
		}
	},

	paths : {
		backbone : 'http://cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.2/backbone-min',
		underscore : 'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min',
		hogan : 'http://cdnjs.cloudflare.com/ajax/libs/hogan.js/2.0.0/hogan',
		tinymce : 'tinymce/jscrupts/tiny_mce/tiny_mce',
		app : '../app'
	},

	baseUrl : 'js/lib'
});

require(['jquery', 'backbone', 'hogan', 'app/rteMonitor'], function($, Backbone, hogan, monitor){
	var Router = Backbone.Router.extend({
			routes : {
				'popup' : 'popup',
				'*default' : 'default'
			}
		}),
		router = new Router;

	router.on('route:popup', function(){
		//alert('Pop-up');

	});
	router.on('route:default', function(){
		var template = hogan.compile( $('#main').html() );
		$('body').append(template.render());

	})
	Backbone.history.start();

});
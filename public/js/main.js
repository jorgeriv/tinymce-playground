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
require(['jquery', 'backbone', 'hogan', 'app/rteMonitor', 'tinymce', 'app/RTE_Module/app', 'jquery.tinymce'], 
function($, Backbone, Hogan, monitor, tinymce, rte) {
	var Router = Backbone.Router.extend({
		routes: {
			'*default': 'default'
		}
	}),
		router = new Router;

	router.on('route:default', function() {
		var mainView = new (Backbone.View.extend({

			className : 'span6',
			template : Hogan.compile( $('#main').html() ),
			events : {
				"click .inst2" : "toggleInst2",
				"click .inst3" : "popup"
			},

			initialize : function(){
				rte.addEditor('inst1');
			},

			render : function(){
				this.$el.html(this.template.render({}));
				return this;
			},

			toggleInst2 : function(e){
				e.preventDefault();
				if($(e.currentTarget).data().action === 'add'){
					rte.addEditor('inst2');
				} else {
					rte.removeEditor('inst2');
				}
			}, 

			popup : function(e){

				e.preventDefault();

				require(['app/popup', 'app/popup-content-view'], function(popup, Content){
					var content = new Content;
					popup.show(content.render().el);
				});
			}

		}));

		$('#content').html( mainView.render().el );
	});

	Backbone.history.start({
		pushState: true
	});

	$('#info button').click(function(e){
		var $target = $(this);
			$('#status').toggleClass('active');
			monitor.toggle();
	});



});
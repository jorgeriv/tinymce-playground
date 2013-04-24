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
		'jquery.tinymce': 'tinymce/jscripts/tiny_mce/jquery.tinymce',
		bootstrap: 'bootstrap.min',
		app: '../app'
	},

	baseUrl: 'js/lib'
});

// Here is where the magic begins
require(['jquery', 'backbone', 'hogan', 'app/rteMonitor', 'tinymce', 'app/RTE_Module/app', 'jquery.tinymce', 'bootstrap'], function($, Backbone, Hogan, monitor, tinymce, rte) {
	var Router = Backbone.Router.extend({
		routes: {
			'*default': 'default'
		}
	}),
		router = new Router;

	router.on('route:default', function() {
		var mainView = new(Backbone.View.extend({

			className: 'span6',
			template: Hogan.compile($('#main').html()),
			events: {
				"click .inst2": "toggleInst2",
				"click .inst3": "popup"
			},

			initialize: function() {
				rte.addEditor('inst1');
			},

			render: function() {
				this.$el.html(this.template.render({}));
				return this;
			},

			toggleInst2: function(e) {
				e.preventDefault();
				if ($(e.currentTarget).data().action === 'add') {
					rte.addEditor('inst2', {
						// General options
						mode: "textareas",
						theme: "advanced",
						plugins: "autolink,lists,spellchecker,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template",

						// Theme options
						theme_advanced_buttons1: "save,newdocument,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,styleselect,formatselect,fontselect,fontsizeselect",
						theme_advanced_buttons2: "cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,|,insertdate,inserttime,preview,|,forecolor,backcolor",
						theme_advanced_buttons3: "tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,emotions,iespell,media,advhr,|,print,|,ltr,rtl,|,fullscreen",
						theme_advanced_buttons4: "insertlayer,moveforward,movebackward,absolute,|,styleprops,spellchecker,|,cite,abbr,acronym,del,ins,attribs,|,visualchars,nonbreaking,template,blockquote,pagebreak,|,insertfile,insertimage",
						theme_advanced_toolbar_location: "top",
						theme_advanced_toolbar_align: "left",
						theme_advanced_statusbar_location: "bottom",
						theme_advanced_resizing: true,

						// Skin options
						skin: "o2k7",
						skin_variant: "silver",

					});
				} else {
					rte.removeEditor('inst2');
				}
			},

			popup: function(e) {

				e.preventDefault();

				require(['app/popup', 'app/popup-content-view'], function(popup, content) {
					popup.show(content.render().el);
					rte.addEditor('inst3', 'popup');
					$('#modalLauncher').trigger('click');
				});
			}

		}));

		$('#content').html(mainView.render().el);
	});

	Backbone.history.start({
		pushState: true
	});

	$('#info button').click(function(e) {
		var $target = $(this);
		$('#status').toggleClass('active');
		monitor.toggle();
	});


});
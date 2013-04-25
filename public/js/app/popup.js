define(['backbone', 'hogan', 'text!./templates/popup.hjs'], function (Backbone, Hogan, template) {

	var Modal = Backbone.View.extend({
		id: "myModal",

		className: "modal hide fade",

		tabindex: "-1",

		role: "dialog",

		'aria-labelledby': "myModalLabel",

		'aria-hidden': "true",

		template: null,

		events: {

		},

		initialize: function() {
			this.template = Hogan.compile(template);
		},

		render: function (data) {
			this.$el.html(this.template.render(data));
			return this;
		}
	});

	var mWindow = new Modal({});

	var alert = new Modal({});

	var prompt = new Modal({});

	$('body').append(mWindow.render().el);

	return {
		alert : function(){

		},

		prompt : function(title, text){

		},

		window: function (title, content, onOpen, onClose) {
			var data = {
				title: title || '',
				body: content || ''
			};

			mWindow.render(data).$el.one('shown', onOpen).one('hidden', onClose).modal('show');
		}
	};
});
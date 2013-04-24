define(['backbone', 'hogan', 'text!./templates/popup.hjs'], function (Backbone, Hogan, template) {

	var PopUp = Backbone.View.extend({
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

	var popup = new PopUp();

	$('body').append(popup.render().el);

	return {
		show: function (title, content, callbackShow, callbackHide) {
			var data = {
				title: title || '',
				body: content || ''
			};

			popup.render(data).$el.one('shown', callbackShow).one('hidden', callbackHide).modal('show');
		}
	};
});
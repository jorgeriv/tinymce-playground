define(['backbone', 'hogan'], function(Backbone, Hogan){
	var popup = new(Backbone.View.extend({

		id : "myModal",

		className : "modal hide fade",

		tabindex : "-1",

		role : "dialog",

		'aria-labelledby' : "myModalLabel",

		'aria-hidden' : "true",

		template: Hogan.compile($('#modal').html()),

		events : {

		},

		render : function(data){
			this.$el.html(this.template.render(data));
			return this;
		}

	}));

	return {
		show : function(content){
			var templateData = {
				title : 'RTE instance added dynamically to the DOM',
				body :  content || ''
			};
			$('body').append(popup.render(templateData).el);
		}
	}
});
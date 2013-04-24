define(['backbone'], function(Backbone){
	return new (Backbone.View.extend({
		render : function(){
			this.$el.html('<textarea id="inst3" class="rte"></textarea>');
			return this;
		}
	}));
});
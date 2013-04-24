define('tinymce', function(tinymce){
	var id;
	return {
		start : function(){
			$('.info p').html(tinymce.activeEditor.id);
			id = setTimeOut(arguments.calee, 100);
		},
		stop : function(){
			$('.info p').html('Not monitoring');
			clearTimeOut(id);
		}
	}
});
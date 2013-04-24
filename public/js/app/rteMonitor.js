define(['tinymce'], function(tinymce){
	var id = null;
	return {
		start : function(){
			if(tinymce.activeEditor){
				$('#info #status').html(tinymce.activeEditor.id);
			} else {
				$('#info #status').html('No active editor');
			}
			id = setTimeout(arguments.callee, 100);
		},
		stop : function(){
			$('#info #status').html('Not monitoring');
			clearTimeout(id);
			id=null;
		},
		toggle : function(){
			if(id){
				this.stop();
			} else {
				this.start();
			}
		}
	}
});
define(['tinymce', 'jquery', 'underscore', 'jquery.tinymce'], function(tinymce, $, _) {
	var gSettings = {}, // global settings
		editors = []; // active editors ID's array

	gSettings.defaults = { // default settings
		mode: "none",
		theme: "simple"
	};

	gSettings.popup = { // custom settings
		plugins: '-example',
		mode: "textareas",
		theme: "advanced",
		theme_advanced_buttons1: "mylistbox,mysplitbutton,bold,italic,underline,separator,strikethrough,justifyleft,justifycenter,justifyright,justifyfull,bullist,numlist,undo,redo,link,unlink",
		theme_advanced_buttons2: "",
		theme_advanced_buttons3: "",
		theme_advanced_toolbar_location: "top",
		theme_advanced_toolbar_align: "left",
		theme_advanced_statusbar_location: "bottom"
	}

	tinymce.init(gSettings.defaults);

	return {

		addEditor: function(target, settings) {
			if (typeof settings === 'string' && gSettings[settings]) {
					settings = gSettings[settings];
			} else if (typeof settings !== 'object') {
				settings = gSettings.defaults;
			}

			tinymce.settings = settings;

			if(typeof target === 'string'){
				if(_.contains(editors, target)){
					this.removeEditor(target);
				}
				tinymce.execCommand('mceAddControl', false, target); // if editor doesn't exist, add
				editors.push(target);
			}
		},

		removeEditor: function(target) {

			//TODO: verifty if the target is already an editor, if not, skip
			if (typeof target === 'string') {
				editors = _.reject(editors, function(item){
					return target === item;
				});
				tinymce.execCommand('mceFocus', false, target);
				tinymce.execCommand('mceRemoveControl', false, target);
			}
		},

		removeActive: function() {

			if (tinymce.activeEditor) {
				editors = _.reject(editors, function(item){
					return tinymce.activeEditor.id === item;
				});
				tinymce.activeEditor.remove();
			}
		},

		addSettings: function(id, settings) {

			id = id || null;
			settings = settings || null;

			if (typeof settings === 'object' && typeof id === 'string') {
				gSettings[id] = settings;
			}
		}
	}
})
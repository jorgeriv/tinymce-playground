define(['tinymce', 'jquery', 'jquery.tinymce'], function(tinymce, $) {
	var gSettings = {};
	gSettings.defaults = {
		mode: "none",
		theme: "simple"
	};

	gSettings.popup = {
		plugins: '-example',
		// - tells TinyMCE to skip the loading of the plugin
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
			switch (typeof settings) {
			case 'object':
				tinymce.settings = settings;
				break;
			case 'string':
				if (gSettings[settings]) {
					tinymce.settings = gSettings[settings];
				} else {
					settings = gSettings.defaults;
				}
				break;
				defaul: settings = gSettings.defaults;
				break;
			}
			//TODO: verifty if the target is already an editor, if so update settings and repaint;
			//TODO: verify if target is an id
			tinymce.execCommand('mceAddControl', false, target);
		},

		removeEditor: function(target) {
			//TODO: verifty if the target is already an editor, if not, skip
			if (typeof target === 'string') {
				tinyMCE.execCommand('mceFocus', false, target);
				tinyMCE.execCommand('mceRemoveControl', false, target);
			}
		},

		removeActive: function() {
			if (tinymce.activeEditor) {
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
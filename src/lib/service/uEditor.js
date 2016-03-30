app.service('ueditor',function() {
	var ue = UE.getEditor('container');

	this.getContents = function() {
		var content = ue.getContent();
		return content;
	}

	this.setContents = function(value) {

		ue.execCommand('insertHtml', value)

	}

});
app.service('ueditor',function() {
	var ue = UE.getEditor('container');

	this.getContents = function() {
		var content = ue.getContent();
		return content;
	}

	this.setContents = function(value) {
		ue.addListener("ready", function () {
      // editor准备好之后才可以使用
      ue.execCommand('insertHtml', value)
 
    });
	}

});
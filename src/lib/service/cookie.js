app.service('Cookie', function (){

	function setCookie(name,value,days) {
		var d = new Date();
		d.setTime(d.getTime() + (days*24*60*60*1000));

		var expires = "expires=" + d.toUTCString();
		document.cookie = name + "=" + value + "; " + expires;
	}

	function getCookie(name){
		var username = name + "=";

		var ca = document.cookie.split(',');

		for ( var i = 0, caLength = ca.length; i< caLength; i++) {
			var c = ca[i];

			while (c.charAt(0)==' ') c = c.substring(1);

      if (c.indexOf(username) != -1) return c.substring(username.length, c.length);
		}

		return "";
	}

	function clearCookie(name) {
		setCookie(name, "", -1);
	}

	function checkCookie(name) {
		var user = getCookie(name);

		if (user != "") {
			
			return 1;

		} else {

			return 0;

		}
	}

	this.setCookie = setCookie;

	this.getCookie = getCookie;

	this.clearCookie = clearCookie;

	this.checkCookie = checkCookie;

})
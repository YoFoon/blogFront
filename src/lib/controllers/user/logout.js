app.controller('userLogout',['$scope','$timeout','$resource','Cookie',
	function ($scope,$timeout,$resource,Cookie){

		Cookie.clearCookie('username');;

		alert("登出成功");

		window.location.href = "/#/index";

	}
])
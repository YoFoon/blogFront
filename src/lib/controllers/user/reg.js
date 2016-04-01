app.controller('userReg',['$scope','$timeout','$http','$resource','ServiceConfig','Cookie',
	function ($scope,$timeout,$http,$resource,ServiceConfig,Cookie){
		$scope.isReg = true;

		

		if (Cookie.checkCookie("username")) {

			if (confirm("你已经登入,退出后才能再次注册")) {

				Cookie.clearCookie('username');

				location.reload(true);

			}

		}

		$scope.regSubmit = function (){

			var data = {};

			data.username = $scope.regUsername;
			data.password = $scope.regPassword;
			data.re_password = $scope.regRepeatPassword;
			data.email = $scope.regEmail;

			if (data.password != data.re_password) {
				alert("两次密码不相同");

				return false;
			}

			if (data.username == undefined || data.password == undefined || data.re_password == undefined || data.email == undefined ) {
				alert ("请填写完整注册信息");

				return false;
			}

			var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
      if ( !reg.test(data.email) ) {
        alert("请填写正确邮箱");
        return false;
      }

      $http.post(ServiceConfig.regBlog, data)
      .success( function (res) {

      	if (res.status == 1) {
      		alert("注册成功");

      		Cookie.setCookie("username", data.username, 1);

      		window.location.href = "/#/index";

      	} else {

      		alert(res.message);

      	}

      })
      .error ( function (res) {

      	alert("注册失败");

      });
		}
	}
])
app.controller('userLogin',['$scope','$timeout','$http','$resource','ServiceConfig','Cookie',
	function ($scope,$timeout,$http,$resource,ServiceConfig,Cookie){
		$scope.isReg = false;

		if (Cookie.checkCookie("username")) {

			alert("已经登入，不需要再次登入");

			window.location.href = "/#/index";

		}

		$scope.loginSubmit = function() {

			var data = {};

			data.username = $scope.loginUsername;
			data.password = $scope.loginPassword;

			if (data.username == undefined) {
				alert("请填写用户名");

				return false;
			}

			if (data.password == undefined) {
				alert("请填写密码");

				return false;
			}

			$http.post( ServiceConfig.loginBlog, data )
			.success( function (res) {

				if(res.status == 1) {
					//alert("登录成功");

					if( $scope.loginRemberMe ) {

						Cookie.setCookie("username", data.username, 30);

					}	else {

						Cookie.setCookie("username", data.username, 1);

					}

					window.location.href = "/#/index";
				} else {

					alert(res.message);

				}

			})
			.error( function (res) {

				alert("登录失败");

			});
			
		}
	}
])
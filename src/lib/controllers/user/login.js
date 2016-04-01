app.controller('userLogin',['$scope','$timeout','$http','$resource','ServiceConfig',
	function ($scope,$timeout,$http,$resource,ServiceConfig){
		$scope.isReg = false;

		var data = {};

		$scope.loginSubmit = function() {

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
					alert("登录成功");

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
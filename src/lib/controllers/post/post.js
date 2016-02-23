app.controller('postCtrl', ['$scope','$timeout','$http','$resource','ServiceConfig',
  function($scope,$timeout,$http,$resource,ServiceConfig) {
    $scope.submitForm = function() {

      var data = {};
      data.title = $scope.title;
      data.tags = $scope.tags;
      data.post = $scope.post;
      console.log(data);
      $http.post(ServiceConfig.postBlog, data)
      .success(function(data) {
        if(data.status) {
          window.location.href = "/#/list";
        } else {
          alert("失败");
        }
      })
      .error(function(data) {
        alert("error");
      })
    }
  }]);
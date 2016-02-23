app.controller('listCtrl', ['$scope','$timeout','$http','ServiceConfig',
  function($scope,$timeout,$http,ServiceConfig) {
    $http.get(ServiceConfig.blogList)
      .success(function(data) {
        if(data.status) {
          //console.log(data);
          $scope.items = data.items;
        } else {
          alert("失败");
        }
      })
      .error(function(data) {
        alert("error");
      })
  }]);
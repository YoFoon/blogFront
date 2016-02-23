app.controller('listCtrl', ['$scope','$timeout','$http','ServiceConfig',
  function($scope,$timeout,$http,ServiceConfig) {
    $http.get(ServiceConfig.blogList)
      .success(function(data) {
        if(data.status) {
          //console.log(data);
          $scope.items = data.items;
          console.log($scope.items._id);
        } else {
          alert("失败");
        }
      })
      .error(function(data) {
        alert("error");
      })
  }]);
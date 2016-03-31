app.controller('tagCtrl', ['$scope','$timeout','$http','$location','ServiceConfig',
  function($scope,$timeout,$http,$location,ServiceConfig) {

    var tagType = $location.path().split('/')[2];

    var getUrl = ServiceConfig.blogList + '/' + tagType;
    
    $http.get(getUrl)

      .success(function(data) {

        if(data.status) {

          console.log(data.items);
          $scope.items = data.items;

        } else {

          alert("失败");

        }
      })
      .error(function(data) {

        alert("error");

      })
  }]);
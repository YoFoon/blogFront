app.controller('detailCtrl', ['$scope','$timeout','$http','$location','ServiceConfig',
  function($scope,$timeout,$http,$location,ServiceConfig) {

    var articleId = $location.path().split('/')[2];

    $http.post(ServiceConfig.blogList,{_id:articleId})

      .success(function(data) {

        if(data.status) {

          $scope.item = data.items[0];

        } else {

          alert("失败");

        }
      })
      .error(function(data) {

        alert("error");

      })
  }]);
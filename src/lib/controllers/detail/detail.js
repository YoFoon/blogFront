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

    $scope.submitCommemt = function () {

      var data = {};

      data.id = articleId;
      data.name = $scope.name;
      data.email = $scope.email;
      data.comment = $scope.comment;

      // if(!data.name || !data.email || !data.comment) {
      //   alert("请填写完信息");
      //   return false;
      // }
      
      $http.post(ServiceConfig.postComment,data)

      .success( function (res) {

        if (res.status) {

          $scope.item.comments.push(data);

        } else {

          alert ("失败");

        }

      })
      .error (function (err) {

        alert("ERROR");

      });

    }


  }]);
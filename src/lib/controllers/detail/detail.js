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

      if(data.name == undefined || data.email == undefined || data.comment == undefined) {
        alert("请把评论信息填写完整");
      }

      var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
      if(!reg.test(data.email)){
        alert("请填写正确邮箱");
        return false;
      }
      
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
app.controller('listCtrl', ['$scope','$timeout','$http','ServiceConfig',
  function($scope,$timeout,$http,ServiceConfig) {

    $scope.totalPage = 1;
    $scope.curPage = 1;

    getList();


    $scope.pagePre = function() {

      if( $scope.curPage == 1 ) {
        return false;
      }

      $scope.curPage--;

      getList();

    }
    
    $scope.pageNext = function() {

      if( $scope.curPage == $scope.totalPage ) {
        return false;
      }

      $scope.curPage++;

      getList();
    }

    function getList(){

      var getUrl = ServiceConfig.blogList + '/' + $scope.curPage;

      $http.get(getUrl)

      .success(function(data) {

        if(data.status) {

          $scope.totalPage = data.total;

          $scope.items = data.items;

        } else {

          alert("失败");

        }
      })

      .error(function(data) {

        alert("error");

      });
    }

  }]);
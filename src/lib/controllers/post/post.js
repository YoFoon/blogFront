app.controller('postCtrl', ['$scope','$timeout','$http','$resource','ServiceConfig','ueditor',
  function($scope,$timeout,$http,$resource,ServiceConfig,ueditor) {

    $scope.submitForm = function() {

      var data = {};
      data.title = $scope.title;
      data.tags = $scope.tags;
      data.post = $scope.post;
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
    };

    $scope.uploadImg = function() {
      var formData = new FormData();

      formData.append('file', $('#imageUpload')[0].files[0]);
      
      $.ajax({
        type: 'post',
        url: ServiceConfig.uploadImg,
        data: formData,
        contentType: false,
        processData: false
      }).then(function(data) {

        console.log(data);

      }, function(err) {

        console.log(err);

      })
    }
  }]);

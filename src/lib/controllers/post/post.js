app.controller('postCtrl', ['$scope','$timeout','$http','$resource','ServiceConfig','ueditor',
  function($scope,$timeout,$http,$resource,ServiceConfig,ueditor) {

    $scope.submitForm = function() {

      var data = {};
      data.title = $scope.title;
      data.tags = $scope.tags;
      data.post = ueditor.getContents();
      if(data.title == ''){

        alert("请写标题");

        return false;

      } else if( data.tags == '' ) {

        alert("请选择标签");

        return false;

      } else if( data.tags == '' ) {

        alert( "请输入内容" );

        return false;

      }

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

        if( data.url.indexOf('.jpg') || data.url.indexOf('.png') || data.url.indexOf('.gif') || data.url.indexOf('.jpeg') ) {

          var img = '<img src="'+ ServiceConfig.serviceUrl + data.url +'">';

          ueditor.setContents(img);

        }

      }, function(err) {

        console.log(err);

      })
    };
  }]);

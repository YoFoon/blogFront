app.controller('editCtrl', ['$scope','$timeout','$http','$resource','$location','ServiceConfig','ueditor',
  function($scope,$timeout,$http,$resource,$location,ServiceConfig,ueditor) {

    $scope.isLogin = true;
    var articleId = $location.path().split('/')[2];

    $http.post(ServiceConfig.blogList,{_id:articleId})

    .success(function(res) {

      if(res.status) {

        //$scope.item = res.items[0];

        $scope.title = res.items[0].title;
        $scope.tags = res.items[0].tags;

        ueditor.setContents(res.items[0].post);
        

      } else {

        alert("失败");

      }
    })
    .error(function(res) {

      alert("error");

    });


    $scope.submitForm = function() {

      var data = {};
      data._id = articleId;
      data.title = $scope.title;
      data.tags = $scope.tags;
      data.post = ueditor.getContents();
      if(data.title == undefined){

        alert("请写标题");

        return false;

      } else if( data.tags == undefined ) {

        alert("请选择标签");

        return false;

      } else if( data.tags == undefined ) {

        alert( "请输入内容" );

        return false;

      }

      $http.post(ServiceConfig.updateBlog, data)
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

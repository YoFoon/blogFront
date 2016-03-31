var app = angular.module('myApp', ['ui.router','ngResource']);

//var SERVICE_URL = 'http://127.0.0.1:8000/';
var SERVICE_URL = 'http://blogend.yofoon.com/';
//初始化配置
app.run(['$rootScope', '$state', '$stateParams', function($rootScope,$state, $stateParams) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
}]);

//服务器列表
app.constant('ServiceConfig', {
  serviceUrl: SERVICE_URL,
  postBlog: SERVICE_URL + 'blog/post',
  blogList: SERVICE_URL + 'blog/list',
  uploadImg: SERVICE_URL + 'blog/upload',
  postComment: SERVICE_URL + 'blog/comment'
})

//路由配置
app.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/index');

    $stateProvider.

    state('index', {
      url: '/index',
      views: {
        '': {
            templateUrl: 'view/index/index.html',
        },
        'nav@index': {
            templateUrl: 'view/index/pageShow.html',
            controller: 'PageShowCtrl'
        },
        'con@index': {
            templateUrl: 'view/list/list.html',
            controller: ''
        }
      }
    }).

    state('list', {
      url: '/list',
      views: {
        '': {
            templateUrl: 'view/index/index.html',
        },
        'nav@list': {
            templateUrl: 'view/index/pageShow.html',
            controller: 'PageShowCtrl'
        },
        'con@list': {
            templateUrl: 'view/list/list.html',
            controller: 'listCtrl'
        }
      }
    }).

    state('tag', {
      url: '/list/:tag',
      views: {
        '': {
            templateUrl: 'view/index/index.html',
        },
        'nav@tag': {
            templateUrl: 'view/index/pageShow.html',
            controller: 'PageShowCtrl'
        },
        'con@tag': {
            templateUrl: 'view/list/list.html',
            controller: 'tagCtrl'
        }
      }
    }).

    state('post', {
      url: '/post',
      views: {
        '': {
            templateUrl: 'view/index/index.html',
        },
        'nav@post': {
            templateUrl: 'view/index/pageShow.html',
            controller: 'PageShowCtrl'
        },
        'con@post': {
            templateUrl: 'view/post/post.html',
            controller: 'postCtrl'
        }
      }
    }).

    state('detail', {
      url: '/detail/:id',
      views: {
        '': {
            templateUrl: 'view/index/index.html',
        },
        'nav@detail': {
            templateUrl: 'view/index/pageShow.html',
            controller: 'PageShowCtrl'
        },
        'con@detail': {
            templateUrl: 'view/detail/detail.html',
            controller: 'detailCtrl'
        }
      }
    });
    
  }]);
app.filter('to_Html', function ($sce) {
  return function (input) {
    return $sce.trustAsHtml(input);
  }
});
app.service('ueditor',function() {
	var ue = UE.getEditor('container');

	this.getContents = function() {
		var content = ue.getContent();
		return content;
	}

	this.setContents = function(value) {

		ue.execCommand('insertHtml', value)

	}

});
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
app.controller('PageShowCtrl', ['$scope','$timeout',
  function($scope,$timeout) {
    var urlHash = '#/index';
    $scope.isFullPage = true;
    var timer = $timeout (

      function() {
        urlHash = window.location.hash;
      },
      100
    );

    timer.then(function() {
      if(window.location.hash == '#/index'){
        $scope.isFullPage = true;
      } else {
        $scope.isFullPage = false;
      }
    })

  }]);
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

          $scope.totalPage = Math.ceil(data.total / 10);

          $('.rightInfo').scrollTop(0);

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
app.controller('tagCtrl', ['$scope','$timeout','$http','$location','ServiceConfig',
  function($scope,$timeout,$http,$location,ServiceConfig) {

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

      var tagType = $location.path().split('/')[2];

      var getUrl = ServiceConfig.blogList + '/' + tagType + '/' + $scope.curPage;
      
      $http.get(getUrl)

        .success(function(data) {

          if(data.status) {

            $scope.totalPage = Math.ceil(data.total / 10);

            $('.rightInfo').scrollTop(0);

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
app.controller('postCtrl', ['$scope','$timeout','$http','$resource','ServiceConfig','ueditor',
  function($scope,$timeout,$http,$resource,ServiceConfig,ueditor) {

    $scope.submitForm = function() {

      var data = {};
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

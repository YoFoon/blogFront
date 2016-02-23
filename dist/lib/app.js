var app = angular.module('myApp', ['ui.router','ngResource']);

var SERVICE_URL = 'http://127.0.0.1:8000/';

//初始化配置
app.run(['$rootScope', '$state', '$stateParams', function($rootScope,$state, $stateParams) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
}]);

//服务器列表
app.constant('ServiceConfig', {
  postBlog: SERVICE_URL + 'blog/post',
  blogList: SERVICE_URL + 'blog/list'
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
            controller: ''
        }
      }
    });
    
  }]);
app.controller('listCtrl', ['$scope','$timeout','$http','ServiceConfig',
  function($scope,$timeout,$http,ServiceConfig) {
    $http.get(ServiceConfig.blogList)
      .success(function(data) {
        if(data.status) {
          //console.log(data);
          $scope.items = data.items;
        } else {
          alert("失败");
        }
      })
      .error(function(data) {
        alert("error");
      })
  }]);
app.controller('PageShowCtrl', ['$scope','$timeout',
  function($scope,$timeout) {
    console.log(window.location.href);
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
app.controller('postCtrl', ['$scope','$timeout','$http','$resource','ServiceConfig',
  function($scope,$timeout,$http,$resource,ServiceConfig) {
    $scope.submitForm = function() {

      var data = {};
      data.title = $scope.title;
      data.tags = $scope.tags;
      data.post = $scope.post;
      console.log(data);
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
    }
  }]);
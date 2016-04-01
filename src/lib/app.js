var app = angular.module('myApp', ['ui.router','ngResource']);

var SERVICE_URL = 'http://127.0.0.1:8000/';
//var SERVICE_URL = 'http://blogend.yofoon.com/';
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
  postComment: SERVICE_URL + 'blog/comment',
  regBlog: SERVICE_URL + 'blog/reg',
  loginBlog: SERVICE_URL + 'blog/login'
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
    }).

    state('reg', {
      url:'/reg',
      views: {
        '': {
            templateUrl: 'view/index/index.html',
        },
        'nav@reg': {
          templateUrl: 'view/user/index.html',
          controller: 'userReg'
        }
      }
    }).

    state('login', {
      url:'/login',
      views: {
        '': {
            templateUrl: 'view/index/index.html',
        },
        'nav@login': {
          templateUrl: 'view/user/index.html',
          controller: 'userLogin'
        }
      }
    })
    
  }]);
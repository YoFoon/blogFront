var app = angular.module('myApp', ['ui.router']);

var SERVICE_URL = 'http://127.0.0.1:3000/';

//初始化配置
app.run(['$rootScope', '$state', '$stateParams', function($rootScope,$state, $stateParams) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
}]);

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
            controller: 'listCtrl'
        },
        'con@list': {
            templateUrl: 'view/list/list.html',
            controller: ''
        }
      }
    });

  }]);
(function() {
    'use strict';

    angular
        .module('gofarModule', [
            //'ngRoute',
            'ui.router',
            'ngCookies',
            'gofarModule.gofarControllers',
            'gofarModule.gofarDirectives',
            'gofarModule.gofarServices',
            'gofarModule.gofarFactories'
        ])
    

        /*.config(function($routeProvider) {
            $routeProvider
            .when("/list", {
                templateUrl : "templates/list.html"
            })
            .when("/view", {
                templateUrl : "templates/view.html"
            })
            .when("/edit", {
                templateUrl : "templates/edit.html"
            })
            .when("/add", {
                templateUrl : "templates/add.html"
            });
        });*/
        .config(function($stateProvider, $urlRouterProvider) {

            $stateProvider
            
                .state('home', {
                    url: '/',
                    templateUrl: 'templates/home.html',
                    controller: 'homeCtrl',
                    controllerAs: 'homeC'
                })
                .state('login', {
                    url: '/login',
                    templateUrl: 'templates/login.html',
                    controller: 'loginCtrl',
                    controllerAs: 'loginC'
                })
            
                .state('register', {
                    url: '/register',
                    templateUrl: 'templates/register.html',
                    controller: 'registerCtrl',
                    controllerAs: 'registerC'
                })

                .state('portal', {
                    url: '/portal',
                    templateUrl: 'templates/portal.html',
                    controller: 'portalCtrl',
                    controllerAs: 'portalC'
                })

                .state('portal.list', {
                    url: '/list',
                    views: {
                        "crud": {
                            templateUrl: 'templates/list.html'
                        }
                    }
                })
            
                .state('portal.view', {
                    url: '/view',
                    views: {
                        "crud": {
                            templateUrl: 'templates/view.html'
                        }
                    }
                })
                
                .state('portal.edit', {
                    url: '/edit',
                    views: {
                        "crud": {
                            templateUrl: 'templates/edit.html'
                        }
                    }
                })
        
                .state('portal.add', {
                    url: '/add',
                    views: {
                        "crud": {
                            templateUrl: 'templates/add.html'
                        }
                    }
                });
            
            $urlRouterProvider.otherwise('/');
        })
    
        .run(function run($rootScope, $location, $http, $state, $cookies, Permission) {
            // keep user logged in after page refresh
            /*$rootScope.globals = $cookies.getObject('globals') || {};
            if ($rootScope.globals.currentUser) {
                $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
            }*/

            $rootScope.$on('$locationChangeStart', function (event, next, current) {
                // redirect to login page if not logged in and trying to access a restricted page
                var restrictedPage = $.inArray($location.path(), ['/', '/login', '/register']) === -1;
                //var loggedIn = $rootScope.globals.currentUser;
                var loggedIn = $cookies['loggedIn'];//$rootScope.isLoggedIn;
                if (restrictedPage && loggedIn == 'false') {
                    $location.path('/');
                    $state.go('home');
                    console.log('User not logged in.');
                }
                else {
                    console.log('User logged in.');
                }
            });
        });
})();
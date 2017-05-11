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
    
        .config(function($stateProvider, $urlRouterProvider, $httpProvider) {
            $httpProvider.interceptors.push('AuthInterceptor');
            $stateProvider            
                .state('home', {
                    url: '/',
                    templateUrl: 'templates/home.html',
                    controller: 'homeCtrl',
                    controllerAs: 'homeC'
                })
                .state('home.login', {
                    url: 'login',
                    views: {
                        "auth": {
                            templateUrl: 'templates/login.html',
                            controller: 'loginCtrl',
                            controllerAs: 'loginC'
                        }
                    }
                })
            
                .state('home.register', {
                    url: 'register',
                    views: {
                        "auth": {
                            templateUrl: 'templates/register.html',
                            controller: 'registerCtrl',
                            controllerAs: 'registerC'
                        }
                    }
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
                    },
                    params: {
                        roles : ['user', 'admin']
                    }
                })
        
                .state('portal.add', {
                    url: '/add',
                    views: {
                        "crud": {
                            templateUrl: 'templates/add.html'
                        }
                    },
                    params: {
                        roles : ['user', 'admin']
                    }
                })
            
                .state('unauthorized', {
                    url: '/unauthorized',
                    templateUrl: 'templates/unauthorized.html',
                    controller: 'unauthoCtrl',
                    controllerAs: 'unauthoC'
                });
            
            $urlRouterProvider.otherwise('/');
        })
    
        .run(['$rootScope', '$location', '$http', '$state', '$cookies', 'Permission', function($rootScope, $location, $http, $state, $cookies, Permission) {
            // keep user logged in after page refresh
            /*$rootScope.globals = $cookies.getObject('globals') || {};
            if ($rootScope.globals.currentUser) {
                $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
            }*/

            $rootScope.$on('$locationChangeStart', function (event, next, current) {
                // redirect to login page if not logged in and trying to access a restricted page
                //var canAccess = 
                if (($state.current.params && ($state.current.params &&$state.current.params.roles.indexOf(Permission.permissionA()) == -1)) || $state.current.name == 'unauthorized') {
                    $state.go('unauthorized');
                }
                var restrictedPage = ['', '/', '/login', '/register'].indexOf($location.path()) === -1;//can use $location.path() as well
                //var loggedIn = $rootScope.globals.currentUser;
                var loggedIn = $cookies['loggedIn'];//$rootScope.isLoggedIn;
                if (restrictedPage && loggedIn == 'false'){
                    $state.go('home');
                    console.log('User not logged in.');
                }
                else {
                    console.log('User logged in.');
                }
            });
        }]);
})();

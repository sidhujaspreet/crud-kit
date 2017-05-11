
(function() {
    'use strict';

    angular
        .module('gofarModule.gofarFactories', [])
        .factory('GetData', GetData)
        .factory('UserService', UserService)
        .factory('Permission', Permission)
        .factory('AuthInterceptor', AuthInterceptor);

    GetData.$inject = ['$http'];
    UserService.$inject = ['$http'];
    Permission.$inject = ['$rootScope'];
    AuthInterceptor.$inject = ['$q', '$location'];

    function GetData($http) {
        return {
            getTableList: function() {
                return $http.get("https://api.myjson.com/bins/13g23l")
                .then(function(result){
                    return result.data;
                });
            },
            getContent: function() {
                //return the promise directly.
                return $http.get('https://api.myjson.com/bins/jpu6v')
                    .then(function(result) {
                        //resolve the promise as the data
                        console.log(result.data);
                        return result.data;
                    });
            },
            putContent: function(userData) {
                // Posting data to php file
                $http({
                        method: 'POST',
                        url: 'clone.php',
                        data: userData
                    })
                    .success(function(data) {
                        if (data.errors) {
                            return {
                                // Showing errors.
                                errorName: data.errors.name,
                                errorUserName: data.errors.username,
                                errorEmail: data.errors.email
                            }
                        } else {
                            return {
                                message: data.message
                            }
                        }
                    });
            }
        }
    };

    function UserService($http) {

        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            return $http.get('/api/users').then(handleSuccess, handleError('Error getting all users'));
        }

        function GetById(id) {
            return $http.get('/api/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function GetByUsername(username) {
            return $http.get('/api/users/' + username).then(handleSuccess, handleError('Error getting user by username'));
        }

        function Create(user) {
            return $http.post('/api/users', user).then(handleSuccess, handleError('Error creating user'));
        }

        function Update(user) {
            return $http.put('/api/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }

        function Delete(id) {
            return $http.delete('/api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function() {
                return {
                    success: false,
                    message: error
                };
            };
        }

    };

    function Permission($rootScope) {
        return {
            setPermission: function() {
                $rootScope.$broadcast('permissionsChanged');
            },
            permissionList: function() {
                return ['public', 'user', 'admin']
            },
            permissionP: function() {
                return 'public';
            },
            permissionU: function() {
                return 'user';
            },
            permissionA: function() {
                return 'admin';
            }
        };
    };

    function AuthInterceptor($q, $location) {
        return {
            responseError(response) {
                if (response.status === 401 || response.status === 403) {
                    $location.path('/unauthorized');
                }
                return $q.reject(response);
            }
        };
    };

})();
=======


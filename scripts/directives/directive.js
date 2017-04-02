(function() {
    'use strict';

    angular
        .module('gofarModule.gofarDirectives', [])
        .directive('hasPermission', hasPermission);

    hasPermission.$inject = ['Permission']

    function hasPermission(Permission) {
        return {
            restrict: "A",
            scope: {
                role: "=hasPermission"
            },
            link: function(scope, element, attrs) {
                //var permissionList = Permission.permissionList();
                function toggleVisibilityBasedOnPermission() {
                    if (scope.role.indexOf(Permission.permissionP()) != -1) {
                        element[0].style.display = 'block';
                    } else {
                        element[0].remove();
                    }
                }

                toggleVisibilityBasedOnPermission();
                scope.$on('permissionsChanged', toggleVisibilityBasedOnPermission);
            }
        };
    };

})();

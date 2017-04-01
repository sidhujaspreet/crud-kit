(function(){
    'use strict';

    angular
        .module('gofarModule.gofarControllers', ['gofarModule.gofarFactories'])
        .controller('appCtrl', appCtrl)
        .controller('homeCtrl', homeCtrl)
        .controller('loginCtrl', loginCtrl)
        .controller('registerCtrl', registerCtrl)
        .controller('portalCtrl', portalCtrl);
    
    appCtrl.$inject = ['$rootScope', '$state', '$cookies'];
    homeCtrl.$inject = ['$state'];
    loginCtrl.$inject = ['$rootScope', '$state', 'UserService', '$cookies'];
    registerCtrl.$inject = [];
    portalCtrl.$inject = ['$rootScope', 'GetData', '$location'];
    
    function appCtrl($rootScope, $state, $cookies){
        var appC = this;
        appC.logoutClick = logoutClick;
        return appC;
        
        function logoutClick() {
            //$rootScope.isLoggedin = false;
            $cookies['loggedIn'] = 'false';
            $state.go('login');
        }
    };
    
    function homeCtrl($state){
        var self = this;
        self.goToLogin = function(){
            $state.go('login');
        };
        
        self.goToRegister = function(){ 
            $state.go('register');
        };
        
        
        return self;
    };
    
    function loginCtrl($rootScope, $state, UserService, $cookies){
        var vm = this;
    
        $rootScope.isLoggedIn = false;
        vm.name = "Jaspreet Singh";
        vm.loginClicked = function(){
            //$rootScope.isLoggedIn = true;
            $cookies['loggedIn'] = 'true';
            $state.go('portal');
        };
        vm.anotherLoginClicked = function(){
            //$rootScope.isLoggedIn = false;
            $cookies['loggedIn'] = 'false';
            $state.go('portal');
        };
        return vm;
    };
    
    function registerCtrl(){};

    function portalCtrl($rootScope, GetData, $location){
        var vm = this;
        
        vm.newUser = {
            newName : '',
            newEmail : ''
        };
        
        vm.tableList = ['table 1', 'table 2', 'table 3', 'table 4'];
        
        //$location.path('/login');
        GetData.getContent().then(function(data) {
            vm.data = data.employees;
        });
        
        vm.viewDetails = function(index){
            vm.emp = vm.data[index].name;
            vm.email = vm.data[index].email;
            vm.go('/view');
        };
        
        vm.editClick = function(index){
            if(index){
                vm.emp = vm.data[index].name;
                vm.email = vm.data[index].email;
            }
            vm.go('/edit');
        };
        
        vm.goToList = function(){
            vm.go('/portal/list');
        };
        
        vm.deleteClick = function(index){
            
        };
        
        vm.submitEdit = function(){
            
        };
        
        vm.submitAdd = function(){
            console.log(vm.newUser.newName);
            GetData.putContent(vm.newUser);
        };
        
        vm.addClicked = function(){
            vm.go('/add');
        };
        
        
        vm.go = function ( path ) {
            //$location.path( path );
        };

        vm.name = 'Jaspreet Singh';
        
        return vm;
    };
    
    
})();

//https://api.myjson.com/bins/jpu6v

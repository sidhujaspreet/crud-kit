
(function(){
    'use strict';

    angular
        .module('gofarModule.gofarControllers', ['gofarModule.gofarFactories'])
        .controller('appCtrl', appCtrl)
        .controller('homeCtrl', homeCtrl)
        .controller('loginCtrl', loginCtrl)
        .controller('registerCtrl', registerCtrl)
        .controller('portalCtrl', portalCtrl)
        .controller('unauthoCtrl', unauthoCtrl);
    
    appCtrl.$inject = ['$rootScope', '$state', '$cookies'];
    homeCtrl.$inject = ['$state'];
    loginCtrl.$inject = ['$rootScope', '$state', 'UserService', '$cookies'];
    registerCtrl.$inject = ['$rootScope', '$state', 'UserService', '$cookies'];
    portalCtrl.$inject = ['$rootScope', 'GetData', '$state'];
    unauthoCtrl.$inject = ['$state'];
    
    function appCtrl($rootScope, $state, $cookies){
        var appC = this;
        appC.rolePublic = ['public'];
        appC.roleUser = ['user'];
        appC.roleAdmin = ['admin'];
        appC.roleALL = ['public', 'user', 'admin'];
        appC.roleUserAdmin = ['user', 'admin'];
        appC.rolePublicUser = ['public', 'user'];
        appC.logoutClick = logoutClick;
        return appC;
        
        function logoutClick() {
            //$rootScope.isLoggedin = false;
            $cookies['loggedIn'] = 'false';
            $state.go('home.login');
        }
    };
    
    function homeCtrl($state){
        var self = this;
        
        self.goToLogin = (function(){
            $state.go('home.login');
        })();
        
        self.goToRegister = function(){ 
            $state.go('home.register');
        };
        
        return self;
    };
    
    function loginCtrl($rootScope, $state, UserService, $cookies){
        var vm = this;
        
        vm.user = {
            name : '',
            password : ''
        };
        
        vm.login = function(){
            console.log(vm.user.name + ' ' + vm.user.password);
            $cookies['loggedIn'] = 'true';
            $state.go('portal');
        };
        
        $rootScope.isLoggedIn = false;
        vm.name = "Jaspreet Singh";
        vm.anotherLoginClicked = function(){
            //$rootScope.isLoggedIn = false;
            $cookies['loggedIn'] = 'false';
            $state.go('portal');
        };
        return vm;
    };
    
    function registerCtrl($rootScope, $state, UserService, $cookies){
        var vm = this;
        vm.user = {
            name : '',
            password : '',
            email : '',
            cEmail : ''
        };
        vm.register = function(){
            console.log(vm.user.name + ' ' + vm.user.password);
            $cookies['loggedIn'] = 'true';
            $state.go('portal');
        };
        return vm;
    };

    function portalCtrl($rootScope, GetData, $state){
        var vm = this;        
        vm.newUser = {
            newName : '',
            newEmail : ''
        };
        
        vm.tableList = [];
        
        //$state.go('portal.leftPanel', {notify: false});
        //$location.path('/login');
        vm.renderTable = function(tableID){
            console.log(tableID);
            GetData.getContent().then(function(data) {
                vm.data = data.employees;
                $state.go('portal.list');
            });
        }
        
        vm.renderTableList = (function(){
            GetData.getTableList().then(function(data) {
                vm.tableList = data.tables;
            });
        })();      
        
        vm.viewDetails = function(index){
            console.log("table id : " + index);
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
            vm.renderTable();
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
    
    function unauthoCtrl($state){
        var self = this;
        self.goToHome = function(){
            $state.go('home');
        };
        return self;
    };
    
    
})();

//https://api.myjson.com/bins/jpu6v
=======

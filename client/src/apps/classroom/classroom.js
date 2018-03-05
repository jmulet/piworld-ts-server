require('../../libs/ng-modules/pwLoadingContainer.js');
require('../ngApp-deps.js');

var ngApp = angular.module("ngApp", ["ngSanitize", "angular-growl", "AuthModule", "ModalsModule",
    "PwTableModule", "TranslateModule", "pwLoadingContainer"]);

require('../ngApp-config');
require('./Session'); 
require('./components/pwc-units'); 

function AppController($http) {
    var ctrl = this;
    ctrl.user = pwApp.user;
    ctrl.group = null;
    ctrl.collapsed = false;
};

AppController.$inject = ["$http"];

ngApp.component("appComponent", {
    template: require('./classroom.html'),  
    controller: AppController,
    controllerAs: "vm"
});

ngApp.controller("navigation", ["$scope", "socket", "growl", function ($scope, socket, growl) {
    var ctrl = $scope;
    ctrl.chatsRecieved = [];
    ctrl.onlineUsers = [];
    ctrl.chatsRecieved = [];
    ctrl.onlineUsers = [];
    ctrl.count = {totalConnected: 0};
    
    socket.on("usersLogedin", function(user){
         var found = ctrl.onlineUsers.filter( function(e) { return e.id === user.id} );
        if (found.length === 0) {
            ctrl.onlineUsers.push(user);
            if (user.id !== pwApp.user.id) {
                growl.info(user.fullname + " ha iniciat sessió");
            }
        }
        ctrl.count.totalConnected = user.totalConnected;
    });
    
    socket.on("usersLogedout", function(user){
        var found = ctrl.onlineUsers.filter( function(e) { return e.id === user.id} );
        if (found.length) {
            var index = ctrl.onlineUsers.indexOf(found[0]);
            ctrl.onlineUsers.splice(index, 1);
        } 
        growl.warning("Logout " + user.fullname);
        ctrl.count.totalConnected = user.totalConnected;
    });

    socket.on("chatsNew", function(chat){
        ctrl.chatsRecieved.push(data);
    });

}]);

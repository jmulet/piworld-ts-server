require('../../libs/entities/UserModel.js');
require('../../libs/entities/SchoolModel.js');
require('../../libs/ng-modules/LoadingContainer.js');
require('../ngApp-deps.js');

var ngApp = angular.module("ngApp", ["ngSanitize", "angular-growl", "AuthModule", "ModalsModule",
    "PwTableModule", "TranslateModule", "LoadingContainer"]);

require('./centersComponent.js');
require('./usersComponent.js');
require('../ngApp-config.js');

function AppController($http) {
    var ctrl = this;
    ctrl.selection = null;

    if (pwApp.user.idRole > 0) {
        $http.get('@/api/center/list?id=' + pwApp.user.schoolId).then(function (r) {
            ctrl.school = r.data;
        }).catch(function () {

        });
    }

    ctrl.centerChanged = function (u) {
        ctrl.selection = u;
    };
};

AppController.$inject = ["$http"];

ngApp.component("cuComponent", {
    template: require('./centersAndUsers.html'), //pwApp.config.staticPrefix + "/apps/admin/centersAndUsers.html",
    controller: AppController,
    controllerAs: "vm"
});

ngApp.component("uComponent", {
    template: require('./users.html'), // pwApp.config.staticPrefix + "/apps/admin/users.html",
    controller: AppController,
    controllerAs: "vm"
});

ngApp.controller("navigation", ["$scope", "socket", "growl", function ($scope, socket, growl) {
    var ctrl = $scope;
    ctrl.chatsRecieved = [];
    ctrl.onlineUsers = [];
    ctrl.count = {totalConnected: 0};
   
    // Recieve a list of all users
    socket.on("usersOnline", function(list){
        console.log("Recieved an array ", list);
        ctrl.onlineUsers = list;
        ctrl.count.totalConnected = list.length;
    });

    // Notification of a new user
    socket.on("usersLogedin", function(user){        
            var found = ctrl.onlineUsers.filter(function(e) { return e.id === user.id} );
            if (found.length === 0) {
                ctrl.onlineUsers.push(user);
                if (user.id !== pwApp.user.id) {
                    growl.info(user.fullname + " ha iniciat sessió");
                }
            }
            ctrl.count.totalConnected = user.totalConnected;    
    });
    
    socket.on("usersLogedout", function(user){
        var found = ctrl.onlineUsers.filter(function(e) { return e.id === user.id} );
        if (found.length) {
            var index = ctrl.onlineUsers.indexOf(found[0]);
            ctrl.onlineUsers.splice(index, 1);
        } 
        growl.warning(user.fullname + " ha sortit de la sessió");
        ctrl.count.totalConnected = user.totalConnected;
    });

    socket.on("chatsNew", function(chat){
        ctrl.chatsRecieved.push(data);
    });
    $scope.isCentersAndUsers = true;

    $scope.centersAndUsers = function () {
        $scope.isCentersAndUsers = true;
        $scope.iframeSrc = null;
    };

    $scope.openAdminTask = function (url) {
        $scope.isCentersAndUsers = false;
        $scope.iframeSrc = url;
    };
}]);

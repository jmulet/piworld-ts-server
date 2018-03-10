require('../../libs/ng-modules/pwLoadingContainer');
require('../../libs/ng-modules/pwRolePicker');
require('../../libs/ng-modules/pwStatusPicker');
// require('../../libs/ng-modules/picklist');
require('angular-multiple-select');

require('../ngApp-deps.js');


var ngApp = angular.module("ngApp", ["pwCore", "ngSanitize", "angular-growl", "AuthModule", "ModalsModule",
    "PwTableModule", "TranslateModule", "pwLoadingContainer", "pwRolePicker", "pwStatusPicker", "multipleSelect"]);

require('./centersComponent.js')(ngApp);
require('./usersComponent.js')(ngApp);
require('./holidaysComponent.js')(ngApp);
require('./termsComponent.js')(ngApp);
require('../ngApp-config.js')(ngApp);

function AppController($http, User) {
    var ctrl = this;
    ctrl.selection = null;

    if (User.idRole > 0) {
        $http.get('@/api/school/list?idSchool=' + User.idSchool).then(function (r) {
            ctrl.school = r.data;
        }).catch(function () {

        });
    }

    ctrl.centerChanged = function (u) {
        ctrl.selection = u;
    };
};

AppController.$inject = ["$http", "User"];

ngApp.component("cuComponent", {
    template: require('./centersAndUsers.html'), 
    controller: AppController,
    controllerAs: "vm"
});

ngApp.component("uComponent", {
    template: require('./users.html'), 
    controller: AppController,
    controllerAs: "vm"
});

ngApp.controller("navigation", ["$scope", "socket", "growl", "User", function ($scope, socket, growl, User) {
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
                if (user.id !== User.id) {
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

require('../../libs/ng-modules/PasswordStrength.js');
require('../../libs/entities/UserModel.js');
require('../../libs/entities/SchoolModel.js');

function pathJoin(a, b) {
    var a2 = a.trim();
    var b2 = b.trim();
    if (a2[a2.length - 1] === "/") {
        a2 = a2.substr(0, a2.length - 1);
    }
    if (b2[0] === "/") {
        b2 = b2.substr(b, b2.length - 1);
    }
    return a2 + "/" + b2;
}


(function () {

    var ngApp = angular.module("ngApp", ["ngSanitize", "angular-growl", "AuthModule", "ModalsModule", 
    "PwTableModule", "PasswordStrength"]);

    require('./centersComponent.js');
    require('./usersComponent.js');

    ngApp.config(['growlProvider', '$httpProvider', function (growlProvider, $httpProvider) {
        growlProvider.globalTimeToLive(5000);

        //set pwApp.config.basePrefix to api calls Only those starting by @
        $httpProvider.interceptors.push(['growl', '$q', function (growl, $q) {
            return {
                'request': function (req) {
                    if (req.url[0] === '@') {
                        req.url = pwApp.config.basePrefix + req.url.substr(1);
                    }
                    return req;
                },
                'responseError': function (res) {
                    if (res.status === 500) {
                        growl.error(res.data.msg || res.data.message || res.data.errors ||  JSON.stringify(res.data));
                    } else if (res.status === 400 && res.data.errors) {
                        growl.error("Per favor, reviseu els errors del formulari.");
                        // Transform errors to object like notation
                        if (!Array.isArray(res.data.errors)) {
                            res.data.errors = [res.data.errors];
                        }
                        var $errors = {};
                        res.data.errors.forEach(function (e) {
                            var msg = "";
                            for (var key in e.constraints) {
                                msg += e.constraints[key] + "\n";
                            }
                            if (e.property && msg) {
                                $errors[e.property] = msg;
                            }
                        });
                        res.data.errors = $errors;
                    }
                    return $q.reject(res);
                }
            }
        }]);


    }]);

    ngApp.filter('statusname', function () {
        return function (value) {
            var out = value || "";
            if (value == 1) {
                out = "ENABLED";
            }
            else if (value == 0) {
                out = "DISABLED";
            }
            else if (value == -1) {
                out = "PENDING";
            }
            return out;
        };
    });

    ngApp.filter('rolename', function () {
        return function (idRole) {
            var out;
            for (var name in pwApp.UserRoles) {
                var role = pwApp.UserRoles[name];
                if (role === idRole) {
                    out = name;
                    break;
                }
            }
            if (!out) {
                out = idRole + "-UNKNOWN";
            }
            return out;
        };
    });

    function formErrors() {
        return {
            restrict: "A",
            scope: {
                formErrors: "="
            },
            link: function (scope, element, attrs) {

                scope.$watch("formErrors", function (newValue, oldValue, s) {
                    // Search all elements containing name
                    var inputs = element.find('[name]');

                    if (newValue) {
                        $.each(inputs, function (index) {
                            var name = $(this).attr("name");
                            var msg = newValue[name];
                            if (msg) {
                                $(this).css("outline", "2px solid red");
                            } else {
                                $(this).css("outline", "2px solid lightgreen");
                                $(this).css("background", "");
                            }
                        });
                    }
                }, false);
            }
        }
    }


    ngApp.directive("formErrors", formErrors);

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

    ngApp.controller("navigation", ["$scope", function($scope){
        $scope.isCentersAndUsers = true;

        $scope.centersAndUsers = function() {
            $scope.isCentersAndUsers = true;
            $scope.iframeSrc = null;
        };

        $scope.openAdminTask = function(url) {
            $scope.isCentersAndUsers = false;
            $scope.iframeSrc = url;
        };
    }]);

})();
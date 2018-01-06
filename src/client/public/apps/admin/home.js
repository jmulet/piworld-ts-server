var ngApp = angular.module("ngApp", ["ngSanitize", "angular-growl", "AuthModule", "ModalsModule", "PwTableModule", "PasswordStrength"]);

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
            'responseError': function(res) {
                if (res.status === 500) {                
                    growl.error(res.data.msg || res.data.message || res.data.errors || JSON.stringify(res.data));
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
                            msg += e.constraints[key]+ "\n";
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
        var out = idRole || "";
        if (idRole === pwApp.UserRoles.admin) {
            out = "ADMINISTRATOR";
        }
        else if (idRole === pwApp.UserRoles.teacher) {
            out = "TEACHER";
        }
        else if (idRole === pwApp.UserRoles.teacherNonEditing) {
            out = "TEACHER-nonEditing";
        }
        else if (idRole === pwApp.UserRoles.teacheradmin) {
            out = "TEACHER ADMIN";
        }
        else if (idRole === pwApp.UserRoles.student) {
            out = "STUDENT";
        }
        else if (idRole === pwApp.UserRoles.guest) {
            out = "GUEST";
        }
        else if (idRole === pwApp.UserRoles.parents) {
            out = "FAMILY";
        }
        else {
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
                    $.each(inputs, function(index){
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

function AppController($rootScope, $http, growl, Auth, PwTable, $filter, Modals, $uibModal) {
    var vm = this;
    vm.showStudents = false;

    vm.tableParams0 = new PwTable({
        page: 1,            // show first page
        count: 10,           // count per page
        sorting: ["+fullname"]
    }, function ($defer, params) {
        $http.get('@/api/center/list').then(function (r) {
            if (r.data.length) {
                vm.selection = r.data[0];
                vm.tableParams.reload();
            }
            $defer.resolve(r.data);
        }).catch(function () {
            $defer.resolve([]);
        });
    }
    );

    vm.tableParams = new PwTable({
        page: 1,            // show first page
        count: 10,           // count per page
        sorting: ["+fullname"]
    }, function ($defer, params) {
        if (vm.selection) {
            $http.get('@/api/users/list?schoolId=' + vm.selection.id + "&showStudents=" + vm.showStudents).then(function (r) {
                $defer.resolve(r.data);
            }).catch(function () {
                $defer.resolve([]);
            });
        } else {
            $defer.resolve([]);
        }

    });

    vm.toggle = function () {
        vm.tableParams.reload();
    };

    vm.changeSelection = function (u) {
        if (vm.selection===null || vm.selection != u) {
            vm.selection = u;
            vm.tableParams.reload();
        }
    };

    vm.newCenter = function () {
        //vm.tableParams.reload();
        var u = { id: 0, schoolName: "", professorName: "", professorEmail: "", language: "ca", edit: true, enrollpassword: Math.random().toString(36).substring(4), canEnroll: 1, canPublish: 1 };
        vm.tableParams0.$data.push(u);
        vm.edit0(u);
    };

    vm.newTeacher = function () {
        var u = {id: 0, fullname: "", username: "", password: "", email: "", idRole: 200, schoolId: vm.selection.id};        
        vm.edit(u);
    };

    vm.edit = function (u) {
         
        var modal = $uibModal.open({
            animation: true,
            templateUrl: "/admin/userEditDialog.html",
            controller: ['$scope', function(scope) {
                scope.UserRoles = [];
                var obj = null;
                for(var key in pwApp.UserRoles) {
                    var value = pwApp.UserRoles[key];
                    var option = {label: key, value: value};
                    scope.UserRoles.push(option);
                    if (value === u.idRole) {
                        obj = option;
                    }
                }

                scope.ValidityOptions = [
                    {label: 'Disabled', value: 0},
                    {label: 'Enabled', value: 1},
                    {label: 'Pending', value: -1},
                ];
 
                scope.role = obj || scope.UserRoles[0];
                scope.u = angular.copy(u);

                scope.valid = scope.ValidityOptions.filter(function(e){ return e.value === scope.u.valid; })[0] || scope.ValidityOptions[1];

                scope.ok = function() {
                    scope.u.id = parseInt(scope.u.id);
                    scope.u.idRole = scope.role.value;
                    scope.u.valid = parseInt(scope.u.valid);
                    scope.u.email = scope.u.email ? scope.u.email : null;
                    scope.u.valid = scope.valid.value;
 
                    // Save it and close modal if no validation errors
                    $http.post("@/api/users/save", scope.u).then(function (r) {
                        var data = r.data;
                        if ((!u.id && data.id) || (u.id && data.changed)) {
                            growl.success("S'ha desat l'usuari.");
                        } else {
                            growl.warning("No s'ha modificat l'usuari");
                        }
                        vm.tableParams.reload();
                        scope.$errors = null;
                        modal.close();
                    }).catch(function (r) {
                        console.log("UPPS!!!" , r);
                        var data = r.data;
                        scope.$errors = data.errors;            
                    }); 
                };

                scope.cancel = function() {
                    modal.close();
                };
                
            }]
        });
    };
  
  

    vm.save0 = function (u) {
        u.id = parseInt(u.id);
        u2 = angular.copy(u);
        u2.$errors = null;
        u2.backup = null;
        u2.changed = null;
        u2.edit = null; 

        $http.post("@/api/center/save", u2).then(function (r) {
            var data = r.data;
            if ((!u.id && data.id) || (u.id && data.changed)) {
                growl.success("S'ha desat el centre.");
            } else {
                growl.error("No s'ha pogut desar el centre :-(");
            }
            vm.tableParams0.reload();
            vm.selection = null;
            vm.edit = false;
            u.$errors = null;
        }).catch(function (r) {
            var data = r.data;
            u.$errors = data.errors;        
            u.backup = angular.copy(u);
            u.edit = true;
            console.log("Error", r);
        });
    };


    vm.cancel0 = function (u) {
        for (var key in u.backup) {
            u[key] = u.backup[key];
        }
        delete u.backup;
        if (u.id === 0) {
            vm.tableParams0.reload();
        }
        vm.selection = null;
    };

    vm.confirmDlg = function (u) {

        var okcb = function () {
            $http.delete("@/api/users/delete?idUser=" + u.id).then(function (r) {
                vm.tableParams.reload();
                console.log(r);
                if (!r.data.ok) {
                    growl.warning("Unable to delete user " + u.fullname);
                }
            }, function (r) {
                console.log("Error", r);
            });
        };

        Modals.confirmdlgpwd("Confirm delete user " + u.fullname, 'Segur que voleu eliminar aquest usuari?', okcb);

    };

    vm.confirmDlg0 = function (u) {

        var okcb = function () {
            $http.delete("@/api/center/delete?schoolId=" + u.id).then(function (r) {
                if (!r.data.affectedRows) {
                    growl.warning("Unable to delete center " + u.schoolName);
                }
                vm.tableParams0.reload();
                vm.selection = null;

            }).catch(function (r) {

                growl.error("Unable to delete center " + u.schoolName, r.errors);
                console.log("Error", r);

            });
        };

        Modals.confirmdlgpwd("Confirm delete center " + u.schoolName, 'Segur que voleu eliminar aquest centre?', okcb);

    };

};

AppController.$inject = ['$rootScope', '$http', 'growl', 'Auth', 'PwTable', '$filter', 'Modals', '$uibModal' ];


ngApp.component("appComponent", {
    templateUrl: pwApp.config.staticPrefix + "/apps/admin/home.html",
    controller: AppController,
    controllerAs: "vm"
});

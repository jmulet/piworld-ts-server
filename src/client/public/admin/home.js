var ngApp = angular.module("ngApp", ["ngSanitize", "angular-growl", "AuthModule", "ModalsModule", "PwTableModule"]);

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

    /*
    //set pwApp.config.basePrefix to api calls
    $httpProvider.interceptors.push(function () {
        return {
            'request': function (config) {
                if (config.url[0] === '@') {
                    config.url = $sce.trustAsUrl(pathJoin(pwApp.config.baseURL, config.url.substr(1)));
                }                
                return config;
            }
        }
    });
    */

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
        link: function(scope, element, attrs){
          var name = attrs.name;
          scope.$watch("formErrors", function (oldValue, newValue){
                if (!newValue) {
                    element.css("border", "none");
                    return;
                }
                
                var error;
                for (var i=0; i < newValue.length; i++){
                    var e = newValue[i];
                    if (e.property === name) {
                        error = e;
                        break;
                    }
                }

                if (error) {
                    element.css("border", "2px solid red");
                    element.attr("title", JSON.stringify(error.constrains) );
                } else {
                    element.css("border", "none");
                }
          });
        }
    }
}
 
ngApp.directive("formErrors", formErrors);

function AppController($rootScope, $http, growl, Auth, PwTable, $filter, Modals) {
    var vm = this;
    vm.showStudents = false;
   
    vm.tableParams0 = new PwTable({
        page: 1,            // show first page
        count: 10,           // count per page
        sorting: ["+fullname"]
    }, function ($defer, params) {
        $http.get('/api/center/list').then(function (r) {
            if (r.data.length) {
                vm.selection = r.data[0];
                vm.tableParams.reload();
            }
            $defer.resolve(r.data);
        }).catch(function(){
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
            $http.get('/api/users/list?schoolId=' + vm.selection.id + "&showStudents=" + vm.showStudents).then(function (r) {
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
        if (vm.selection != u) {
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
        //vm.tableParams.reload();
        var u = { id: 0, fullname: "", username: "", password: "", email: "", idRole: 100, schoolId: vm.selection.id, edit: true };
        vm.tableParams.$data.push(u);
        vm.edit(u);
    };

    vm.edit = function (u) {
        u.backup = angular.copy(u);
    };

    vm.edit0 = function (u) {
        u.backup = angular.copy(u);
    };

    vm.save = function (u) {
        u.id = parseInt(u.id);
        delete u.backup;
        delete u.edit;

        u.idRole = parseInt(u.idRole);
        u.valid = parseInt(u.valid);
        u.email = u.email ? u.email : null;
        u.valid = u.valid ? u.valid : 0;

        $http.post("/api/users/save", u).then(function (r) {
            if ( (!u.id && r.id) || (u.id && r.changed) ) {
                growl.success("S'ha desat l'usuari.");
            } else {
                growl.error("No s'ha pogut desar l'usuari :-(");
            }
            vm.tableParams.reload();
            vm.errors = null;
            u.edit = false;
        }).cath(function(r) {
            growl.error("Cal que reviseu els errors del formulari.");
            vm.errors = r.errors;
            u.backup = angular.copy(u);
            u.edit = true;
            console.log("Error", r);
        });

    };

    vm.save0 = function (u) {
        u.id = parseInt(u.id);
        delete u.backup;
        delete u.edit;
        
        $http.post("/api/center/save", u).then(function (r) {
            if ( (!u.id && r.id) || (u.id && r.changed) ) {
                growl.success("S'ha desat el centre.");
            } else {
                growl.error("No s'ha pogut desar el centre :-(");
            }
            vm.tableParams0.reload();
            vm.selection = null;
            vm.edit = false;
            vm.errors0 = null;
        }).catch(function (r) {
            growl.error("Cal que reviseu els errors del formulari.");
            vm.errors0 = r.errors;
            u.backup = angular.copy(u);
            u.edit = true;
            console.log("Error", r);
        });
    };

    vm.cancel = function (u) {
        for (var key in u.backup) {
            u[key] = u.backup[key];
        }
        delete u.backup;
        if (u.id === 0) {
            vm.tableParams.reload();
        }
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
            $http.delete("/api/users/delete?idUser=" + u.id).then(function (r) {
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
            $http.delete("/api/center/delete?schoolId=" + u.id).then(function (r) {
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

AppController.$inject = ['$rootScope', '$http', 'growl', 'Auth', 'PwTable', '$filter', 'Modals' ];


ngApp.component("appComponent", {
    templateUrl: pwApp.config.basePrefix + "/admin/home.html",
    controller: AppController,
    controllerAs: "vm"
});

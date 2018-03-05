var UserModel = require("../../libs/entities/UserModel");

module.exports = function (ngApp) {

    var controller = function ($rootScope, $http, growl, Auth, PwTable, $filter, Modals, $uibModal, $sce, UserRolesMap) {
        var ctrl = this;
        ctrl.filter = {idRole: "*"};

        ctrl.roleChanged = function(idRole) {
            console.log("role changed to "+ idRole);
            ctrl.filter.idRole = idRole;
            ctrl.toggle();
        };

        ctrl.tableParams = new PwTable({
            page: 1,            // show first page
            count: 10,           // count per page
            sorting: ["+fullname"]
        }, function ($defer, params) {
            if (ctrl.selection && ctrl.selection.id) {
                $http.get('@/api/user/list?offspring=1&idSchool=' + ctrl.selection.id + "&filter=" + ctrl.filter.idRole).then(function (r) {
                    $defer.resolve(r.data);
                }).catch(function () {
                    $defer.resolve([]);
                });
            } else {
                $defer.resolve([]);
            }
        });

        ctrl.toggle = function () {
            ctrl.tableParams.reload();
        };

        ctrl.centerChanged = function (u) {
            ctrl.onSelect(u);
        };

        ctrl.newUser = function () {
            //var u = {id: 0, fullname: "", username: "", password: "", email: "", idRole: 200, idSchool: ctrl.selection.id};        
            var u = angular.copy(UserModel.defaultObject);
            u.idSchool = ctrl.selection.id;
            u.idRole = UserRolesMap.student;
            ctrl.edit(u);
        };

        ctrl.importUsers = function () {
            var modalInstance = $uibModal.open({
                template: require('./usersImportDialog.html'),
                controller: ['$scope', function (scope) {
                    scope.title = "User import @ " + ctrl.selection.schoolName;
                    scope.msg = "Paste users with this format<br>"
                        + "<i><b>username</b></i> : <i><b>fullname</b></i> : <i><b>password</b></i> : <i>email</i> : <i>Recovery key</i>";
                    scope.model = { csv: "", idSchool: ctrl.selection.id, updateIfExists: false, idRole: UserRolesMap.student, mustChgPwd: false };

                    scope.roleChanged = function (idRole) {
                        scope.model.idRole = idRole;
                        if (idRole === UserRolesMap.parents) {
                            scope.msg = "Paste users with this format<br>"
                                + "<i><b>username</b></i> : <i><b>fullname</b></i> : <i><b>password</b></i> : <i>email</i> : <i>Recovery key</i> : <i>[child username1, ...]</i>";
                        } else {
                            scope.msg = "Paste users with this format<br>"
                                + "<i><b>username</b></i> : <i><b>fullname</b></i> : <i><b>password</b></i> : <i>email</i> : <i>Recovery key</i>";
                        }
                    };

                    scope.ok = function () {
                        modalInstance.close(scope.model);
                    };

                    scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }],
                size: 's'
            });

            modalInstance.result.then(function (model) {
                $http.post("@/api/user/import", model).then(function (r) {
                    var msg = $sce.trustAsHtml(r.data.join("<br/>"));
                    Modals.notificationdlg("Import result", msg, null, { logger: true });
                    ctrl.tableParams.reload();
                });
            });
        };



        ctrl.edit = function (u) {
            //Load all students in the current school (to allow parents select offspring)
            $http.get("@/api/user/list?idSchool=" + ctrl.selection.id + "&filter=" + UserRolesMap.student).then(function (r) {
                var students = r.data;
                var modal = $uibModal.open({
                    animation: true,
                    template: require("./userEditDialog.html"),
                    controller: ['$scope', function (scope) {
                        scope.students = students;
                        scope.studentsSelected = [];
                        if (u._offspring) {
                            for(var i=0; i<u._offspring.length; i++){
                                var offspring = u._offspring[i];
                                for(var j=0; j<students.length; j++){
                                    var st = students[j];
                                    if(st.id === offspring.idChild) {
                                        st.idOffspring = offspring.id;
                                        scope.studentsSelected.push(st);
                                        break;
                                    }
                                } 
                            }
                        }
                        if(!scope.studentsSelected.length) {     
                            scope.studentsSelected.push(u);                           
                        }
                        scope.RoleParents = UserRolesMap.parents;
                        scope.opts = { showPwdField: u.id <= 0 };
                        scope.UserRoles = [];
                        scope.EntityProperties = UserModel.properties;

                        scope.u = angular.copy(u);
                        
                        scope.roleChanged = function (idRole) {
                            scope.u.idRole = idRole;
                        };

                        scope.statusChanged = function (status) {
                            scope.u.valid = status;
                        };
 
                        scope.ok = function () {
                            scope.u.id = parseInt(scope.u.id);
                            scope.u.email = scope.u.email ? scope.u.email : null;
                            if (!scope.opts.showPwdField) {
                                delete scope.u.password;
                            }
                            if (scope.u.idRole === UserRolesMap.parents) {
                                scope.u._offspring = [];
                                for (var i=0; i< scope.studentsSelected.length; i++) {
                                    var st = scope.studentsSelected[i];
                                    if (st.idRole!==UserRolesMap.parents) {
                                        scope.u._offspring.push({idParent: scope.u.id, idChild: st.id});   
                                    }
                                }
                                console.log(scope.u);
                            } else {
                                // Delete any associated offspring
                                scope.u._offspring = [];
                            }

                            // Save it and close modal if no validation errors
                            $http.post("@/api/user", scope.u).then(function (r) {
                                var data = r.data;
                                if ((!u.id && data.id) || (u.id && data.changed)) {
                                    growl.success("S'ha desat l'usuari.");
                                }  
                                ctrl.tableParams.reload();
                                scope.$errors = null;
                                modal.close();
                            }).catch(function (r) {
                                var data = r.data;
                                scope.$errors = data.errors;
                            });
                        };

                        scope.cancel = function () {
                            modal.close();
                        };

                    }]
                });

            });

        };



        ctrl.confirmDlg = function (u) {

            var okcb = function () {
                $http.delete("@/api/user?idUser=" + u.id).then(function (r) {
                    ctrl.tableParams.reload();

                }, function (r) {
                    console.log("Error", r);
                });
            };

            Modals.confirmdlgpwd("Confirm delete user " + u.fullname, 'Segur que voleu eliminar aquest usuari?', okcb);

        };

        ctrl.$onChanges = function (changes) {
            if (changes && changes.school) {
                //ctrl.selection = changes.school;
                ctrl.selection = changes.school.currentValue;
                ctrl.tableParams.reload();
            }
        };

    };

    controller.$inject = ['$rootScope', '$http', 'growl', 'Auth', 'PwTable', '$filter', 'Modals', '$uibModal', '$sce', 'UserRolesMap'];

    ngApp.component("usersComponent", {
        bindings: {
            school: "<"
        },
        template: require("./usersComponent.html"),
        controller: controller,
        controllerAs: "vm"
    })

};
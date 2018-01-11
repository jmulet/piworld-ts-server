
(function ()  {
    var ngApp = angular.module("ngApp");

    var controller = function ($rootScope, $http, growl, Auth, PwTable, $filter, Modals, $uibModal, $sce) {
        var vm = this;
        vm.showStudents = false;

        vm.tableParams = new PwTable({
            page: 1,            // show first page
            count: 10,           // count per page
            sorting: ["+fullname"]
        }, function ($defer, params) {
            if (vm.selection && vm.selection.id) {
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

        vm.centerChanged = function (u) {
            vm.onSelect(u);
        };

        vm.newUser = function () {
            //var u = {id: 0, fullname: "", username: "", password: "", email: "", idRole: 200, schoolId: vm.selection.id};        
            var u = angular.copy(pwApp.entities["UserModel"].defaultObject);
            u.schoolId = vm.selection.id;
            u.idRole = pwApp.UserRoles.student;
            vm.edit(u);
        };

        vm.importUsers = function () {
            var modalInstance = $uibModal.open({
                templateUrl: pwApp.config.basePrefix + '/apps/admin/usersImportDialog.html',
                controller: ['$scope', 'modalParams', function (scope, modalParams) {
                    scope.title = modalParams.title;
                    scope.msg = modalParams.msg;
                    scope.schoolId = vm.selection.schoolId;
                    scope.model = { text: "", updateIfExists: false };
                    scope.UserRoles = [];
                    var obj = null;
                    for (var key in pwApp.UserRoles) {
                        var value = pwApp.UserRoles[key];
                        var option = { label: key, value: value, disabled: value < pwApp.user.idRole };
                        scope.UserRoles.push(option);
                        if (value === 200) {
                            obj = option;
                        }
                    }

                    scope.ValidityOptions = [
                        { label: 'Disabled', value: 0 },
                        { label: 'Enabled', value: 1 },
                        { label: 'Pending', value: -1 },
                    ];

                    scope.role = obj || scope.UserRoles[2];

                    scope.ok = function () {
                        scope.model.idRole = scope.role.value;
                        modalInstance.close(scope.model);
                    };

                    scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    };
                }],
                size: 's',
                resolve: {
                    modalParams: function () {
                        return {
                            title: "Importació massiva d'alumnes",
                            msg: "Aferrau el llistat amb aquest format<br>"
                                + "<i><b>username</b></i> : <i><b>fullname</b></i> : <i><b>password</b></i> : <i>email</i> : <i>Recovery key</i>"
                        };
                    }
                }
            });

            modalInstance.result.then(function (model) {
                $http.post("@/api/users/import", {
                    csv: model.text,
                    schoolId: vm.selection.id,
                    updateIfExists: model.updateIfExists,
                    idRole: model.idRole || pwApp.UserRoles.student,
                    mustChgPwd: model.mustChgPwd? true: false
                }).then(function (r) {
                    var msg = $sce.trustAsHtml(r.data.join("<br/>"));
                    Modals.notificationdlg("Import result", msg, null, {logger: true});
                    vm.tableParams.reload();
                });
            });
        };



        vm.edit = function (u) {

            var modal = $uibModal.open({
                animation: true,
                templateUrl: pwApp.config.basePrefix + "/apps/admin/userEditDialog.html",
                controller: ['$scope', function (scope) {
                    scope.UserRoles = [];
                    scope.EntityProperties = pwApp.entities["UserModel"].properties;
                    var obj = null;
                    for (var key in pwApp.UserRoles) {
                        var value = pwApp.UserRoles[key];
                        var option = { label: key, value: value, disabled: value < pwApp.user.idRole };
                        scope.UserRoles.push(option);
                        if (value === u.idRole) {
                            obj = option;
                        }
                    }

                    scope.ValidityOptions = [
                        { label: 'Disabled', value: 0 },
                        { label: 'Enabled', value: 1 },
                        { label: 'Pending', value: -1 },
                    ];

                    scope.role = obj || scope.UserRoles[0];
                    scope.u = angular.copy(u);

                    scope.valid = scope.ValidityOptions.filter(function (e) { return e.value === scope.u.valid; })[0] || scope.ValidityOptions[1];

                    scope.ok = function () {
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
                            var data = r.data;
                            scope.$errors = data.errors;
                        });
                    };

                    scope.cancel = function () {
                        modal.close();
                    };

                }]
            });
        };



        vm.confirmDlg = function (u) {

            var okcb = function () {
                $http.delete("@/api/users/delete?idUser=" + u.id).then(function (r) {
                    vm.tableParams.reload();
                    
                }, function (r) {
                    console.log("Error", r);
                });
            };

            Modals.confirmdlgpwd("Confirm delete user " + u.fullname, 'Segur que voleu eliminar aquest usuari?', okcb);

        };

        vm.$onChanges = function(changes) {
             if (changes && changes.school) {
                //vm.selection = changes.school;
                vm.selection = changes.school.currentValue;
                vm.tableParams.reload();
            }
        };

    };

    controller.$inject = ['$rootScope', '$http', 'growl', 'Auth', 'PwTable', '$filter', 'Modals', '$uibModal', '$sce' ];

    ngApp.component("usersComponent", {
        bindings: {
            school: "<" 
        },
        templateUrl: pwApp.config.basePrefix + "/apps/admin/usersComponent.html",
        controller: controller,
        controllerAs: "vm"
    })
})();
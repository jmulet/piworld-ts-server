var schoolEntity = require("../../libs/entities/SchoolModel");

module.exports = function (ngApp) {

    var controller = function ($scope, $http, growl, Auth, PwTable, $filter, Modals, $uibModal) {
        var ctrl = this;

        ctrl.tableParams0 = new PwTable({
            page: 1,            // show first page
            count: 10,           // count per page
            sorting: ["+fullname"]
        }, function ($defer, params) {
            $http.get('@/api/school/list').then(function (r) {
                if (r.data.length) {
                    ctrl.changeSelection(r.data[0]);
                }
                $defer.resolve(r.data);
            }).catch(function () {
                $defer.resolve([]);
            });
        });


        ctrl.changeSelection = function (u) {
            if (ctrl.selection === null || ctrl.selection != u) {
                ctrl.selection = u;
                ctrl.onSelection && ctrl.onSelection({ $event: u });
            }
        };

        ctrl.newCenter = function () {
            //ctrl.tableParams.reload();
            var u = angular.copy(schoolEntity.defaultObject);
            u.language = "ca";
            u.enrollpassword = Math.random().toString(36).substring(4);
            u.edit = true;
            ctrl.tableParams0.$data.push(u);
            ctrl.edit0(u);
        };

        ctrl.edit0 = function (u) {
            u.backup = angular.copy(u);
            u.edit = true;
        };

        ctrl.save0 = function (u) {
            u.id = parseInt(u.id);
            u2 = angular.copy(u);
            u2.$errors = null;
            u2.backup = null;
            u2.changed = null;
            u2.edit = null;
            $http.post("@/api/school", u2).then(function (r) {
                var data = r.data;
                if ((!u.id && data.id) || (u.id && data.changed)) {
                    growl.success("S'ha desat el centre.");
                } else {
                    growl.error("No s'ha pogut desar el centre :-(");
                }
                ctrl.tableParams0.reload();
                ctrl.selection = null;
                ctrl.edit = false;
                u.$errors = null;
            }).catch(function (r) {
                var data = r.data;
                u.$errors = data.errors;
                u.backup = angular.copy(u);
                u.edit = true;
            });
        };


        ctrl.cancel0 = function (u) {
            for (var key in u.backup) {
                u[key] = u.backup[key];
            }
            delete u.backup;
            u.edit = false;
            ctrl.selection = null;
            ctrl.tableParams0.reload();

        };

        // Shows a dialog to edit school.sopts json object
        ctrl.config0 = function (s) {
            var modalInstance = $uibModal.open({
                template: require('./centersConfig.html'),
                controller: ['$scope', function (scope) {
                    scope.title = "Options of  " + s.schoolName;
                    scope.json = JSON.stringify(s.sopts ||  { year: 2018 }, null, 2);
                    scope.ok = function () {
                        // Test if json is valid
                        try {
                            var sopts = JSON.parse(scope.json);
                            s.sopts = sopts;
                            $http.post("@/api/school", s).then(function (r) {
                                var data = r.data;
                                if ((!s.id && data.id) || (s.id && data.changed)) {
                                    growl.success("S'ha desat el centre.");
                                } else {
                                    growl.error("No s'ha pogut desar el centre :-(");
                                }
                            });
                        } catch (Ex) {
                            console.log(Ex);
                            return;
                        }
                        modalInstance.close();
                    };
                    scope.cancel = function () {
                        modalInstance.dismiss('cancel');
                    }
                }]
            });
        };


        ctrl.confirmDlg0 = function (u) {

            var okcb = function () {
                $http.delete("@/api/school?idSchool=" + u.id).then(function (r) {
                    if (!r.data.affectedRows) {
                        growl.warning("Unable to delete center " + u.schoolName);
                    }
                    ctrl.tableParams0.reload();
                    ctrl.selection = null;

                }).catch(function (r) {

                    growl.error("Unable to delete center " + u.schoolName, r.errors);
                    console.log("Error", r);

                });
            };

            Modals.confirmdlgpwd("Confirm delete center " + u.schoolName, 'Segur que voleu eliminar aquest centre?', okcb);

        };

    };

    controller.$inject = ['$scope', '$http', 'growl', 'Auth', 'PwTable', '$filter', 'Modals', '$uibModal'];

    ngApp.component("centersComponent", {
        bindings: {
            onSelection: "&"
        },
        template: require("./centersComponent.html"),
        controller: controller,
        controllerAs: "vm"
    });

};
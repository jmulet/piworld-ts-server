
(function ()  {
    var ngApp = angular.module("ngApp");

    var controller = function ($scope, $http, growl, Auth, PwTable, $filter, Modals, $uibModal) {
        var ctrl = this;

        ctrl.tableParams0 = new PwTable({
            page: 1,            // show first page
            count: 10,           // count per page
            sorting: ["+fullname"]
        }, function ($defer, params) {
            $http.get('@/api/center/list').then(function (r) {
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
                ctrl.onSelection && ctrl.onSelection({$event: u}); 
            }
        };

        ctrl.newCenter = function () {
            //ctrl.tableParams.reload();
            var u = angular.copy(pwApp.entities["SchoolModel"].defaultObject);
            u.language = "ca";
            u.enrollpassword = Math.random().toString(36).substring(4);
            u.edit = true;
            //var u = { id: 0, schoolName: "", professorName: "", professorEmail: "", language: "ca", edit: true, enrollpassword: Math.random().toString(36).substring(4), canEnroll: 1, canPublish: 1 };
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

            $http.post("@/api/center/save", u2).then(function (r) {
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
                console.log("Error", r);
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


        ctrl.confirmDlg0 = function (u) {

            var okcb = function () {
                $http.delete("@/api/center/delete?schoolId=" + u.id).then(function (r) {
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
        templateUrl : pwApp.config.basePrefix + "/apps/admin/centersComponent.html",
        controller: controller,
        controllerAs: "vm"
    })
})();
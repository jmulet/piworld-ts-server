
(function ()  {
    var ngApp = angular.module("ngApp");

    var controller = function ($scope, $http, growl, Auth, PwTable, $filter, Modals, $uibModal) {
        var vm = this;

        vm.tableParams0 = new PwTable({
            page: 1,            // show first page
            count: 10,           // count per page
            sorting: ["+fullname"]
        }, function ($defer, params) {
            $http.get('@/api/center/list').then(function (r) {
                if (r.data.length) {
                    vm.changeSelection(r.data[0]);
                }
                $defer.resolve(r.data);
            }).catch(function () {
                $defer.resolve([]);
            });
        });


        vm.changeSelection = function (u) {
            if (vm.selection === null || vm.selection != u) {
                vm.selection = u;                       
                vm.onSelection && vm.onSelection({$event: u}); 
            }
        };

        vm.newCenter = function () {
            //vm.tableParams.reload();
            var u = angular.copy(pwApp.entities["SchoolModel"].defaultObject);
            u.language = "ca";
            u.enrollpassword = Math.random().toString(36).substring(4);
            u.edit = true;
            //var u = { id: 0, schoolName: "", professorName: "", professorEmail: "", language: "ca", edit: true, enrollpassword: Math.random().toString(36).substring(4), canEnroll: 1, canPublish: 1 };
            vm.tableParams0.$data.push(u);
            vm.edit0(u);
        };

        vm.edit0 = function (u) {
            u.backup = angular.copy(u);
            u.edit = true;
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
            u.edit = false;
            vm.selection = null;
            vm.tableParams0.reload();

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
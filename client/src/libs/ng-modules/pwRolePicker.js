(function () {
    var ngModule = angular.module("pwRolePicker", ["pwCore"]);

    var controller = function (UserRoles) {
        var ctrl = this;

        ctrl.pickerChanged = function () {
            ctrl.onChanges && ctrl.onChanges({ $event: ctrl.role.value });
        }


        ctrl.$onInit = function () {
 
            if (ctrl.allRoles) {
                var UserRolesAll = [{ value: "*", label: "All", disabled: false }];
                for (var i = 0; i < UserRoles.length; i++) {
                    UserRolesAll.push(UserRoles[i]);
                }
                ctrl.UserRoles = UserRolesAll;
            } else {
                ctrl.UserRoles = UserRoles;
            }

            for (var i = 0; i < ctrl.UserRoles.length; i++) {
                if (ctrl.UserRoles[i].value == ctrl.idRole) {
                    ctrl.role = ctrl.UserRoles[i];
                    break;
                }
            }
 

        }
    };

    controller.$inject = ["UserRoles"];

    ngModule.component("pwcRolePicker", {
        bindings: {
            idRole: "<",
            allRoles: "<",
            onChanges: "&"
        },
        template: '<select class="form-control" ng-model="vm.role" ' +
            'ng-options="item as item.label disable when item.disabled for item in vm.UserRoles track by item.value" ng-change="vm.pickerChanged()"></select>',
        controller: controller,
        controllerAs: "vm"
    });

})();
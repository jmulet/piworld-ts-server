(function () {
    var ngModule = angular.module("pwStatusPicker", []);

    var UserStatus = [
        { label: 'Disabled', value: 0 },
        { label: 'Enabled', value: 1 },
        { label: 'Pending', value: -1 }
    ];


    var controller = function () {
        var ctrl = this;

        ctrl.pickerChanged = function () {
            ctrl.onChanges && ctrl.onChanges({ $event: ctrl.status.value });
        }

        ctrl.UserStatus = UserStatus;

        ctrl.$onInit = function () {
            var idStatus = ctrl.idStatus;
            if (!ctrl.statusList) {
                ctrl.statusList = UserStatus;
            }
            for (var i = 0; i < ctrl.statusList.length; i++) {
                if (ctrl.statusList[i].value === idStatus) {
                    ctrl.status = ctrl.statusList[i];
                    break;
                }
            }
        }
    };

    ngModule.component("pwcStatusPicker", {
        bindings: {
            status: "<",
            statusList: "<",
            onChanges: "&"
        },
        template: '<select class="form-control" ng-model="vm.status" ' +
            'ng-options="item as item.label disable when item.disabled for item in vm.statusList track by item.value" ng-change="vm.pickerChanged()"></select>',
        controller: controller,
        controllerAs: "vm"
    });

})();
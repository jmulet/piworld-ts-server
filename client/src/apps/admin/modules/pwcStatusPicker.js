(function () {
    var ngModule = angular.module("pwcStatusPicker", []);
 
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

        ctrl.$onChanges = function (changes) {
            if (changes.status) {
                var idStatus = changes.status.currentValue;
                for (var i = 0; i < UserStatus.length; i++) {
                    if (UserStatus[i].value === idStatus) {
                        ctrl.status = UserStatus[i];
                        break;
                    }
                }
            }
        }
    };

    ngModule.component("userStatusPicker", {
        bindings: {
            status: "<",
            onChanges: "&"
        },
        template: '<select class="form-control" ng-model="vm.status" ' +
            'ng-options="item as item.label disable when item.disabled for item in vm.UserStatus track by item.value" ng-change="vm.pickerChanged()"></select>',
        controller: controller,
        controllerAs: "vm"
    });

})();
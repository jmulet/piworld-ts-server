(function(){

var app = angular.module("ModalsModule", ["ui.bootstrap", "AuthModule", "TranslateModule"]);

app.service('Modals', ['$uibModal', '$timeout', 'Auth', '$translate', function ($uibModal, $timeout, Auth, $translate) {

    var lastPwdTyped = new Date().getTime();
    var LATENCY = 120000; //2 min.

    this.resetLatency = function () {
        lastPwdTyped = new Date().getTime();
    };

    this.sudlg = function (okcb, cancelcb) {

        var time = new Date().getTime();
        var requirePwd = (time - lastPwdTyped) > LATENCY;

        if (requirePwd) {
            var modalInstance = $uibModal.open({
                templateUrl: '/assets/ng-modules/modals/su-dlg.html',
                controller: ['$scope',  function ($scope) {

                    $scope.cpwd = { text: "" };
                    $scope.invalidpwd = "";
                    var attempts = 0;
                    $timeout(function () {
                        jQuery('#su-dlg').focus();
                    });

                    $scope.ok = function () {
                        Auth.checkPassword($scope.cpwd.text).then(function (d) {
                            if (d.ok) {
                                lastPwdTyped = time;
                                modalInstance.close();
                            }
                            else {
                                $scope.invalidpwd = 'Invalid password';
                                attempts += 1;
                                if (attempts > 3) {
                                    modalInstance.dismiss();
                                }
                            }
                        });
                    };

                    $scope.cancel = function () {
                        modalInstance.dismiss();
                    };

                }],
                size: 'md'
            });

            modalInstance.result.then(function () {
                okcb && okcb();
            }, function () {
                cancelcb && cancelcb();
            });

        } else {
            lastPwdTyped = time;
            okcb && okcb();

        }
    };

    this.notificationdlg = function (title, msg, okcb, opts) {

        var modalInstance = $uibModal.open({
            templateUrl: '/assets/ng-modules/modals/notification-dlg.html',
            controller: ['$scope', function ($scope) {
                $scope.ok = function () {
                    modalInstance.close();
                };
                $scope.title = title;
                $scope.msg = msg;
            }],
            size: (opts ? (opts.size || 'md') : 'md')
        });

        modalInstance.result.then(function () {
            okcb && okcb();
        }, function () {
            okcb && okcb();
        });

        return modalInstance;
    };

    this.inputdlg = function (title, msg, inivalue, okcb, cancelcb, opts) {

        var modalInstance = $uibModal.open({
            templateUrl: '/assets/ng-modules/modals/input-dlg.html',
            controller: ['$scope', function ($scope) {

                $timeout(function () {
                    jQuery('#input-dlg').focus();
                });

                $scope.ok = function () {
                    modalInstance.close($scope.model.text);
                };
                $scope.cancel = function () {
                    modalInstance.dismiss();
                };
                $scope.title = title;
                $scope.msg = msg;
                $scope.model = { text: inivalue };
                $scope.typetextarea = (opts ? (opts.type === 'textarea') : false);
            }],
            size: (opts ? (opts.size || 'md') : 'md')
        });

        modalInstance.result.then(function (value) {
            okcb && okcb(value);
        }, function () {
            cancelcb && cancelcb();
        });

        return modalInstance;
    };



    this.confirmdlg = function (title, msg, okcb, cancelcb, opts, rejectcb) {

        var modalInstance = $uibModal.open({
            templateUrl: '/assets/ng-modules/modals/confirm-dlg.html',
            controller: ['$scope', function ($scope) {
                $scope.ok = function () {
                    modalInstance.close();
                };
                $scope.cancel = function () {
                    modalInstance.dismiss();
                };
                $scope.reject = function () {
                    modalInstance.dismiss(-1);
                };
                $scope.title = title;
                $scope.msg = msg;
                $scope.rejection = 'N';
                if (rejectcb && typeof (rejectcb) === "function") {
                    $scope.rejection = 'Y';
                }
            }],
            size: (opts ? (opts.size || 'md') : 'md')
        });

        modalInstance.result.then(function () {
            okcb && okcb();
        }, function (id) {
            if (id === -1) {
                rejectcb && rejectcb();
            } else {
                cancelcb && cancelcb();
            }
        });

        return modalInstance;
    };


    this.confirmdlgpwd = function (title, msg, okcb, cancelcb, opts) {

        var time = new Date().getTime();
        var requirePwd = (time - lastPwdTyped) > LATENCY;
        if (!requirePwd) {
            lastPwdTyped = time;
        }

        var modalInstance = $uibModal.open({
            templateUrl: '/assets/ng-modules/modals/confirm-dlg-pwd.html',
            controller: ['$scope', 'Auth', function ($scope, Auth) {

                $timeout(function () {
                    jQuery('#confirm-input-pwd').focus();
                });

                $scope.cpwd = { text: "" };
                $scope.invalidpwd = "";
                $scope.title = title;
                $scope.msg = msg;
                $scope.requirePwd = requirePwd;
                var attempts = 0;

                $scope.ok = function () {
                    if (requirePwd) {
                        Auth.checkPassword($scope.cpwd.text).then(function (d) {
                            if (d.ok) {
                                lastPwdTyped = time;
                                modalInstance.close();
                            }
                            else {
                                $scope.invalidpwd = 'Invalid password';
                                attempts += 1;
                                if (attempts > 3) {
                                    modalInstance.dismiss();
                                }
                            }
                        });
                    } else {
                        modalInstance.close(true);
                    }
                };

                $scope.cancel = function () {
                    modalInstance.dismiss();
                };

            }],
            size: (opts ? (opts.size || 'md') : 'md')
        });

        modalInstance.result.then(function () {
            okcb && okcb();
        }, function () {
            cancelcb && cancelcb();
        });

        return modalInstance;
    };

    return this;
}
]);

})();
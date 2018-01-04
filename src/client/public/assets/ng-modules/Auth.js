(function(){

var app = angular.module("AuthModule", []);

app.factory('Auth', ['$http', function ($http) {
        var authService = {};

        authService.checkPassword = function (pwd) {

            var obj = pw.encrypt(JSON.stringify({ password: pwd }));
            return $http({
                method: 'POST',
                url: '/api/users/auth',
                data: obj,
                headers: {
                    'Content-Type': 'text/plain;charset=UTF-8'
                }
            });
        };

        return authService;
    }]);

})();
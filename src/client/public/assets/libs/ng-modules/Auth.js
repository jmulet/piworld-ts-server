(function(){

var app = angular.module("AuthModule", []);

app.factory('Auth', ['$http', function ($http) {
        if(!window.CryptoJS) {
            console.log("Auth module requires CrytoJS");
        }
        if(!pwApp) {
            console.log("Auth module requires pwApp global");
        }
        
        var authService = {};

        authService.checkPassword = function (pwd) {
            var key = parseCookie(pwApp.config.basePrefix+"pwSid");
            var obj = CryptoJS.AES.encrypt(JSON.stringify({ password: pwd }), key).toString();
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
(function(){

var app = angular.module("AuthModule", ["pwCore"]);

app.factory('Auth', ['$http', 'Config', function ($http, Config) {
        if(!window.CryptoJS) {
            console.log("Auth module requires CrytoJS as global");
        } 
        
        var authService = {};

        authService.checkPassword = function (pwd) {
            var key = parseCookie(Config.basePrefix+"pwSid");
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
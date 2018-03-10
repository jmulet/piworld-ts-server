
function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

var loginCtrl = function($scope, $http, Config, __) {
  $scope.opts = {processing: false, showAlert: false};
  $scope.model = {
    username: "", password: "",
    rememberme: false, 
    app: getParameterByName("app"), 
    path: getParameterByName("path")
  };

  $scope.rootLogin = function() {
     $scope.model.username = "root";
     $scope.model.password = "root";
     $scope.doLogin();
  }
    
  $scope.doLogin = function() {
    $scope.opts.processing = true;
    $scope.opts.showAlert = false;
  
    var key = getCookie(Config.basePrefix + "pwsid");
    $http({
      method: "POST",
      url: Config.basePrefix + "/login.htm",
      data: CryptoJS.AES.encrypt(JSON.stringify($scope.model), key).toString(),
      headers: {
        "Content-Type": "text/plain;charset=UTF-8"
      }
    }).then(function (r) {
      var d = typeof(r.data)==='string'? EJSON.parse(r.data): r.data;
      $scope.opts.processing = false;
      if (d.errCode) {
        // Invalid login
        $scope.opts.showAlert = true;
        $scope.alert = (__(d.errCode));
      } else if (d.redirect) {         
        window.location.href = d.redirect;
      }
    });
  };
 
};

loginCtrl.$inject = ["$scope", "$http", "Config", "__"];


var ngApp = angular.module("ngApp",  ["pwCore"]);
ngApp.controller("loginCtrl", loginCtrl); 
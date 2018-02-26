var socketio_ejson_parser = require('../libs/socketio-ejson-parser');
var ngApp = angular.module("ngApp");

ngApp.config(['growlProvider', '$httpProvider', function (growlProvider, $httpProvider) {
    growlProvider.globalTimeToLive(5000);

    //set pwApp.config.basePrefix to api calls Only those starting by @
    $httpProvider.interceptors.push(['growl', '$q', function (growl, $q) {
        return {
            'request': function (req) {
                if (req.url[0] === '@') {
                    req.url = pwApp.config.basePrefix + req.url.substr(1);
                }
                return req;
            },
            'responseError': function (res) {
                if (res.status === 500) {
                    growl.error(res.data.msg || res.data.message || res.data.errors || JSON.stringify(res.data));
                } else if (res.status === 400 && res.data.errors) {
                    growl.error("Per favor, reviseu els errors del formulari.");
                    // Transform errors to object like notation
                    if (!Array.isArray(res.data.errors)) {
                        res.data.errors = [res.data.errors];
                    }
                    var $errors = {};
                    res.data.errors.forEach(function (e) {
                        var msg = "";
                        for (var key in e.constraints) {
                            msg += e.constraints[key] + "\n";
                        }
                        if (e.property && msg) {
                            $errors[e.property] = msg;
                        }
                    });
                    res.data.errors = $errors;
                } 
                return $q.reject(res);
            }
        }
    }]);


}]);

ngApp.filter('statusname', function () {
    return function (value) {
        var out = value || "";
        if (value == 1) {
            out = "ENABLED";
        }
        else if (value == 0) {
            out = "DISABLED";
        }
        else if (value == -1) {
            out = "PENDING";
        }
        return out;
    };
});

ngApp.filter('rolename', function () {
    return function (idRole) {
        var out;
        for (var name in pwApp.UserRoles) {
            var role = pwApp.UserRoles[name];
            if (role === idRole) {
                out = name;
                break;
            }
        }
        if (!out) {
            out = idRole + "-UNKNOWN";
        }
        return out;
    };
});

function formErrors() {
    return {
        restrict: "A",
        scope: {
            formErrors: "="
        },
        link: function (scope, element, attrs) {
            scope.$watch("formErrors", function (newValue, oldValue, s) {
                // Search all elements containing name
                if (newValue) {
                    var inputs = $(element[0]).find('[name]');
                    $.each(inputs, function (index) {
                        var name = $(this).attr("name");
                        var msg = newValue[name];
                        if (msg) {
                            $(this).css("outline", "2px solid red");
                        } else {
                            $(this).css("outline", "2px solid lightgreen");
                            $(this).css("background", "");
                        }
                    });
                }
            }, false);
        }
    }
}

ngApp.directive("formErrors", formErrors);


ngApp.factory('socket', ['$timeout', function ($timeout) {
    var socket = SocketJS.connect({ path: pwApp.config.socketPath, forceNew: true, parser: socketio_ejson_parser});     
    // Strange bug. If not emiting, then no response is recieved on connect
    socket.emit("socketStart");

    return {
      on: function (eventName, callback) {
        socket.on(eventName, function () {              
          var args = arguments;
          console.log("socket on:: ", eventName, args);
          $timeout(function () {
            callback.apply(socket, args);
          });
        });
      },
      emit: function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
          console.log("socket emit:: ", eventName, data);
          var args = arguments;
          $timeout(function () {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        })
      }
    };
}]);
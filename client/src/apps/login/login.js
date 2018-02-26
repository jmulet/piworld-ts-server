import 'crypto-js'; 
require('./login.css');

function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

$(function () {
  var $submit = $("#submit");
  var $parents = $("#parents");
  var $username = $("#username");
  var $password = $("#password");
  var $rememberme = $("#rememberme");
  var $errAlert = $("#errAlert");

  $("#submit2").on("click", function () {
    $username.val("root");
    $password.val("root");
    $submit.trigger("click");
  });

  var doLogin = function (event) {
    if (event.which) {
      if (event.which === 13) {
        event.preventDefault();
      } else {
        return;
      }
    }
    $submit.prop("disabled", true);
    $("#msgAlert").css("display", "none");
    var data = {
      username: $username.val(), password: $password.val(),
      rememberme: $rememberme.prop("checked"), parents: $parents.val(),
      app: getParameterByName("app"), path: getParameterByName("path")
    };
    var key = getCookie(pwApp.config.basePrefix + "pwsid");
    $.ajax({
      method: "POST",
      url: pwApp.config.basePrefix + "/login.htm",
      data: CryptoJS.AES.encrypt(JSON.stringify(data), key).toString(),
      contentType: "text/plain;charset=UTF-8"
    }).done(function (r) {
      var d = typeof(r)==='string'? EJSON.parse(r): r;
      $submit.prop("disabled", false);
      if (d.errCode) {
        // Invalid login
        $errAlert.css("display", "");
        $errAlert.html("<p>" + pwApp.__(d.errCode) + "</p>");
      } else if (d.redirect) {         
        window.location.href = d.redirect;
      }
    });
  };

  $submit.on("click", function (event) {
    event.which = 0;
    doLogin(event);
  });
  $password.keypress(doLogin);

});
 
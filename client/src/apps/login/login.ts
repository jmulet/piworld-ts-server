import * as $ from 'jquery';
import { pwCore } from '../shared/pw-core';
import { $rest } from '../shared/services/AjaxService';

const model = {
    username: "",
    password: "",
    rememberme: false
};

function __(key) {
    return pwCore.Translations[key] || key || "";
}

$(function () {

    const $loginBtn = $("#loginBtn");
    const $asRootBtn = $("#asRootBtn");
    const $errorBox = $("#errAlert");
    const $msgBox = $("#msgAlert");
    const $username = $("#username");
    const $password = $("#password");
    const $rememberme = $("#rememberme");

    const resetForm = function ()  {
        $errorBox.css("display", "");
        $loginBtn.prop("disabled", false);
        $asRootBtn.prop("disabled", false);
        $username.focus();
        $username.val("");
        $password.val("");
        $rememberme.prop("checked", false);
    }

    $username.focus();

    const login = function login() {
        $loginBtn.prop("disabled", true);
        $asRootBtn.prop("disabled", true);
        $errorBox.css("display", "none");

        model.username = $username.val();
        model.password = $password.val();
        model.rememberme = $rememberme.prop("checked");

        $rest.login(model).then(
            (data) => { 
                if (data.redirect) {
                    window.location.href = data.redirect;
                } else if (data.errCode) {
                    $errorBox.html(__(data.errCode));
                    resetForm();
                }
            },
            (data) => {
                resetForm();
            }
        );
    };


    $loginBtn.on("click", (evt) => login());
    $asRootBtn.on("click", (evt) => {
        $username.val("root");
        $password.val("root");
        login();
    });


}); 
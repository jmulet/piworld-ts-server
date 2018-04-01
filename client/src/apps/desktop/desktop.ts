import * as $ from 'jquery';
import 'popper.js';
import 'bootstrap';
//import 'admin-lte/dist/js/adminlte';
import 'coreui.io/Static_Starter_GULP/js/app';
window["EJSON"] = require('ejson');
window["socketio_ejson_parser"] = require('../../assets/js/socketio-ejson-parser');
window["SocketJS"] = require('socket.io-client');
import "socket.io-client";
import { pwCore } from '../shared/pw-core';
import { $rest } from '../shared/services/AjaxService';
import { prefixUrl } from '../shared/services/AjaxClient';
import { onlineUsers } from './onlineUsers';

declare interface HashInterface {
    hash: string;
    name: string;
}
declare interface ApplicationInterface {
    name: string;
    hashes: HashInterface[];
    isAdmin: boolean;
    path: string;
    iframe: HTMLIFrameElement
}
declare const apps: ApplicationInterface[];

function urlParam(name: string): string {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)')
        .exec(window.location.href ||  "");

    if (results.length) {
        return results[1] || "";
    }
    return "";
}


$(function () { 
    const desktopcontent = $("#desktopcontent");
    const hashes = $("#hashes");
    const apphashes = $("#apphashes");
    const applications = $("#applications");
    const iframeContainer = $("#iframe-container");
    let currentIframe: HTMLIFrameElement;

    onlineUsers();

    const $logout = $("#logout");
    $logout.on("click", function (evt) {
        $rest.logout().then(
            (data) => window.location.href = prefixUrl("login.htm")
        )
    });

    const goApp = function goApp(app: ApplicationInterface) {
        //Hide all iframes
        $("#iframe-container iframe").hide();

        const src = prefixUrl(app.path);
        let iframe = app.iframe;
        // <iframe id="extpage" frameborder="0" allowfullscreen style="width:100%; height:100%; display: none;"></iframe>
        if (!iframe && src.indexOf("desktop.htm") < 0) {
            iframe = document.createElement("iframe");
            iframe.style.width = "100%";
            iframe.style.height = "90%"; 
            iframe.allowFullscreen = true;
            iframe.frameBorder = "0";
            iframe.src = src;
            app.iframe = iframe;
            iframeContainer.append(iframe);
        }
        if (iframe) {
            currentIframe = iframe;
            const extpage = $(iframe);
            desktopcontent.hide();
            applications.removeClass("open");
            extpage.show();
        } else {
            desktopcontent.show();
            applications.addClass("open");
        }
         
        if (src.indexOf("/admin") >= 0) {
            hashes.css("background-color", "crimson");
            hashes.find(".nav-dropdown-items").css("background-color", "darkred");
        } else {
            hashes.css("background-color", "dodgerblue");
            hashes.find(".nav-dropdown-items").css("background-color", "darkblue");
        }

        console.log("app is ", app);
        if (app.hashes && app.hashes.length) {
            console.log("showing ...");
            hashes.find("span").text(app.name);
            hashes.css("display", "");
            let html = "";
            app.hashes.forEach((e) =>
                html += '<a class="nav-link" href="#" data-hash="' + e.hash + '"><i class="fa fa-circle"></i>' + e.name + '</a>'
            );
            apphashes.empty();
            apphashes.append(html);
            apphashes.find("a").first().addClass("active");
        } else {
            hashes.css("display", "none");
            apphashes.empty();
        }
    };

    $("#appslinks a").on("click", function (evt) {
        $("#appslinks a").removeClass("active");
        $(this).addClass("active");
        const src = $(this).data("uri");
        const index = $(this).data("index");
        const app = apps[index];
        goApp(app);
    });

    $("#apphashes").on("click", "a", function (evt) {
        $("#apphashes a").removeClass("active");
        $(this).addClass("active");
        const hash = $(this).data("hash");
        console.log(hash);
        if (currentIframe) {
            currentIframe["contentWindow"].location.hash = hash;
        }
    });

    const initialAppName = (urlParam("app") || "").toLocaleLowerCase();

    let foundIndex;
    for (let i = 0; i < apps.length; i++) {
        if (apps[i].name.toLowerCase() === initialAppName) {
            foundIndex = i;
            break;
        }
    }


    if (foundIndex) {
        goApp(apps[foundIndex]);
    } else {
        $("#appslinks a").first().addClass("active");
    }

});

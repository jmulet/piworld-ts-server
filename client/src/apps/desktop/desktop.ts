import * as $ from 'jquery'; 
window["EJSON"] = require('ejson');
window["jQuery"] = $;
window["$"] = $;
window["socketio_ejson_parser"] = require('../../assets/js/socketio-ejson-parser');
window["SocketJS"] = require('socket.io-client');
import "socket.io-client";


import "popper.js/dist/popper.min.js";      
import "bootstrap/dist/js/bootstrap.min.js";         
import "../../assets/libs/admin-lte3/plugins/fastclick/fastclick.js";                                                                
import "../../assets/libs/admin-lte3/dist/js/adminlte.min.js";

import { pwCore } from '../shared/pw-core';
import { $rest } from '../shared/services/AjaxService';
import { prefixUrl } from '../shared/services/AjaxClient';
import { onlineUsers } from './onlineUsers';

const totalMargins = 116;

declare interface HashInterface {
    hash: string;
    name: string;
    icon: string;
}
declare interface ApplicationInterface {
    name: string;
    hashes: HashInterface[];
    isAdmin: boolean;
    path: string;
    icon: string;
    iframe: HTMLIFrameElement
}
declare const apps: ApplicationInterface[];

function urlParam(name: string): string {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)')
        .exec(window.location.href ||  "");

    if ((results|| []).length) {
        return results[1] || "";
    }
    return "";
}

      
function resize(){
    $('#iframe-container iframe').height(window.innerHeight - totalMargins);
}   

$(function () { 
    const desktopcontent = $("#desktopcontent");
    const hashes = $("#hashes");
    const hashesHeader = $("#hashesHeader");
    const apphashes = $("#apphashes");
    const applications = $("#applications");
    const iframeContainer = $("#iframe-container");
    let currentIframe: HTMLIFrameElement;

    // This selector allows to open a given app name: data-goapp="desktop"
    $("[data-goapp]").on("click", function(evt){
        const appName = ($(evt.currentTarget).data("goapp") || "").toLowerCase();
        const found = apps.filter( e => e.name.toLowerCase() === appName)[0];
        if (found) {
            goApp(found);
        }
    });

    // This selector chooses lang
    $("[data-lang]").on("click", function(evt){
        const lang = ($(evt.currentTarget).data("lang") || "").toLowerCase(); 
        window.location.href = prefixUrl("desktop.htm?clang="+lang);
    });

    // This allows to resize iframes
    $(window).on('resize', resize);
    resize();

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
            iframe.allowFullscreen = true;
            iframe.frameBorder = "0";
            iframe.src = src;
            iframe.style.height = (window.innerHeight - totalMargins) + "px";
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
            hashesHeader.css("background-color", "darkred");
        } else {
            hashesHeader.css("background-color", "darkblue");
        }
        const $icon = hashesHeader.find("i").first();
        $icon.removeClass();
        $icon.addClass("nav-icon "  + app.icon);
         

        console.log("app is ", app);
        if (app.hashes && app.hashes.length) {
            console.log("showing ...");
            hashes.find("span").text(app.name);
            hashes.css("display", "");
            let html = "";
            app.hashes.forEach((e) =>
                html += `
                <li class="nav-item">
                <a href="#" class="nav-link" data-hash="${e.hash}">
                  <i class="${e.icon || 'fa fa-circle-o'} nav-icon"></i>
                  <p>${e.name}</p>
                </a>
              </li> 
                `
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

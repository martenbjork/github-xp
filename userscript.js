// ==UserScript==
// @name         Github-XP
// @version      0.1
// @description  Microsoft + GitHub = ❤️. Make it official by giving your GitHub experience some Windows XP flair.
// @author       https://github.com/martenbjork/github-xp (userscript by Christian7573)
// @match        https://*.github.com/*
// @grant        GM_xmlhttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @resource     css https://raw.githubusercontent.com/martenbjork/github-xp/master/xp.css
// @grant        GM_getResourceText
// ==/UserScript==

(function() {

    var clippyHideCss = "body[class]:after, body[class]:before,"+
        ".js-issue-row:first-child:before, .repository-meta-content:before, #partial-discussion-header:before, .js-user-profile-bio-contents:before, .compare-pr-placeholder:before,"+
        ".js-issue-row:first-child:after, .repository-meta-content:after, #partial-discussion-header:after, .js-user-profile-bio-contents:after, .compare-pr-placeholder:after "+
        "{display: none !important;}"

    if (GM_getValue("clippyEnabled") == null || GM_getValue("clippyEnabled") == undefined) GM_setValue("clippyEnabled","true");
    function updateClippy() {
        var value = GM_getValue("clippyEnabled") === "true";
        if (document.querySelector("#clippyToggle") === null) {
            var clippyToggle = document.createElement("style");
            clippyToggle.id = "clippyToggle";
            document.body.appendChild(clippyToggle);
        }
        if (value) document.querySelector("#clippyToggle").innerHTML = "";
        else document.querySelector("#clippyToggle").innerHTML = clippyHideCss;
    }
    GM_registerMenuCommand("Toggle Clippy",function() {
        GM_setValue("clippyEnabled",(!(GM_getValue("clippyEnabled") === "true")).toString());
        updateClippy();
    });
    updateClippy();

    var style = document.createElement("style");
    style.innerHTML = GM_getResourceText("css");
    style.type = "text/css";
    document.head.appendChild(style);

    /*GM_xmlhttpRequest({
        method: "GET",
        url: url,
        onload: function() {
            console.log(arguments);
            console.log(this);
            var style = document.createElement("style");
            style.innerHTML = this.responseText;
            style.type = "text/css";
            document.head.appendChild(style);
        }
    });*/

})();

// ==UserScript==
// @name         getComputedStyle
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  get fonts
// @author       You
// @match http://www/*
// @match https://www/*
// @grant        none
// @noframes
// ==/UserScript==

(function() {
    'use strict';
    
    // DEV: We don't use var but favor parameters since these play nicer with minification
    function computedStyle(el, prop, getComputedStyle, style) {
        getComputedStyle = window.getComputedStyle;
        style =
            // If we have getComputedStyle
            getComputedStyle ?
            // Query it
            // TODO: From CSS-Query notes, we might need (node, null) for FF
            getComputedStyle(el) :

        // Otherwise, we are in IE and use currentStyle
        el.currentStyle;
        if (style) {
            return style
            [
                // Switch to camelCase for CSSOM
                // DEV: Grabbed from jQuery
                // https://github.com/jquery/jquery/blob/1.9-stable/src/css.js#L191-L194
                // https://github.com/jquery/jquery/blob/1.9-stable/src/core.js#L593-L597
                prop.replace(/-(\w)/gi, function (word, letter) {
                    return letter.toUpperCase();
                })
            ];
        }
    }

    window.computedStyle = computedStyle;

    var body = document.querySelectorAll('body')[0];
    var elements = document.querySelectorAll('*');
    var but = document.createElement('button');
    but.innerHTML = 'Get fonts';
    but.setAttribute("style", "position: fixed; left: 0; top: 0; z-index: 999999;");
    body.appendChild(but);
    function getFonts() {
        for (var i = elements.length - 1; i >= 0; i--) {
            console.log(computedStyle(elements[i], 'font-family'),';;', computedStyle(elements[i], 'font-size'),';;', computedStyle(elements[i], 'font-weight'),';;');
        }
    }

    but.addEventListener('click', function(){
        getFonts();
    });
})();

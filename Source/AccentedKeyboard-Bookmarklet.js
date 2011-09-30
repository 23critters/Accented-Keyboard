/*
---

script: AccentedKeyboard.js

description: Allows users to select accented characters as commonly done on touch screens, but with a keyboard via a bookmarklet

license:
 - MIT-style

authors:
 - Thomas Kunambi, 23 Critters

requires:
 - core/1.3: *
 - Element.Forms

provides: [AccentedKeyboard]

...
*/

var init = function() {
        var h=document.getElementsByTagName("head")[0],
            c=document.createElement("script"),
            tj="text/javascript",ts="text/css",
            a=["http://23c.se/Accented-Keyboard/Source/AccentedKeyboard.css","https://ajax.googleapis.com/ajax/libs/mootools/1.3/mootools.js","http://23c.se/Accented-Keyboard/Source/Element.Forms.js","http://23c.se/Accented-Keyboard/Source/AccentedKeyboard.js"];

        for(i=0;i<a.length;i++){
            if(!i){
                j=document.createElement("link");
                j.rel="stylesheet";
                j.type=ts;
                j.href=a[i];
            } else {
                j=document.createElement("script");
                j.type=tj;
                j.src=a[i];
            }
            if (i==a.length-1) {
                j.onload=callback;
            }
            h.appendChild(j);
        }
    },
    callback = function() {
        var aT=document.getElementsByTagName("textarea"),aI=document.getElementsByTagName("input");
        for(i=0;i<aT.length;i++) {
            new AccentedKeyboard({
                element: aT[i],
                bookmarklet:true
            })
        }
        for(i=0;i<aI.length;i++) {
            new AccentedKeyboard({
                element: aI[i],
                bookmarklet:true
            })
        }
    };

init();
/*
---

script: Bookmarklet.js

description: Calls script that will initiate the bookmarklet

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

javascript:(function(){ak=document.createElement('SCRIPT');ak.type='text/javascript';ak.src='http://23c.se/Accented-Keyboard/Source/AccentedKeyboard-Bookmarklet.js';document.getElementsByTagName('head')[0].appendChild(ak);})();
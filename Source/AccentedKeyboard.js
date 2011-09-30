/*
---

script: AccentedKeyboard.js

description: Allows users to select accented characters as commonly done on touch screens, but with a keyboard

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

var AccentedKeyboard = new Class({
    Implements: [Options],
    options: {
        wrapperTag: "div",
        cssActions: {
            "h": "hover",
            "w": "wrapper"
        }
    },
    /**
     * @constructor
     * @this {AccentedKeyboard}
     * @throws {String} If element can't be found, throw error
     * @param {Object} Options for behaviours for the class
     */
    initialize: function(options) {
        this.setOptions(options);

        try {
            this.element = document.id(this.options.element) || this.options.element;
            if (this.element === null) {
                throw("DOM object not found");
            }
        } catch(e) {
            if (console) {
                console.log(e);
            }
            throw e;
        }
        if (Browser.Platform.ios || Browser.Platform.android) {
            return;
        }

        this.oCss = this.options.cssActions;
        this.entitytable = { 191 : 'iquest', 192 : 'Agrave', 193 : 'Aacute', 194 : 'Acirc', 195 : 'Atilde', 196 : 'Auml', 197 : 'Aring', 198 : 'AElig', 199 : 'Ccedil', 200 : 'Egrave', 201 : 'Eacute', 202 : 'Ecirc', 203 : 'Euml', 204 : 'Igrave', 205 : 'Iacute', 206 : 'Icirc', 207 : 'Iuml', 208 : 'ETH', 209 : 'Ntilde', 210 : 'Ograve', 211 : 'Oacute', 212 : 'Ocirc', 213 : 'Otilde', 214 : 'Ouml', 216 : 'Oslash', 217 : 'Ugrave', 218 : 'Uacute', 219 : 'Ucirc', 220 : 'Uuml', 221 : 'Yacute', 223 : 'szlig', 224 : 'agrave', 225 : 'aacute', 226 : 'acirc', 227 : 'atilde', 228 : 'auml', 229 : 'aring', 230 : 'aelig', 231 : 'ccedil', 232 : 'egrave', 233 : 'eacute', 234 : 'ecirc', 235 : 'euml', 236 : 'igrave', 237 : 'iacute', 238 : 'icirc', 239 : 'iuml', 240 : 'eth', 241 : 'ntilde', 242 : 'ograve', 243 : 'oacute', 244 : 'ocirc', 245 : 'otilde', 246 : 'ouml', 248 : 'oslash', 249 : 'ugrave', 250 : 'uacute', 251 : 'ucirc', 252 : 'uuml', 253 : 'yacute', 255 : 'yuml'};
        this.fnNavigate = this._navigate.bind(this);
        var bKeydown = false,
            bAutorepeat = false,
            sLastKey = "",
            aCursorKeys = ["left","right","enter"],
            aValidKeys = [];

        Object.each(this.entitytable, function(key) {
            var sKey = key.charAt(0).toLowerCase();
            if (!aValidKeys.contains(sKey)) {
                aValidKeys.push(sKey);
            }
        });

        this.container = new Element(this.options.wrapperTag, {
            "class": this.oCss.w
        }).wraps(this.element);

        this.element.addEvents({
            "keypress": function(e) {
                if (aCursorKeys.contains(e.key) && this.list) {
                    e.preventDefault();
                    this.fnNavigate(e);
                    return;
                }

                if (bKeydown && aValidKeys.contains(e.key) && sLastKey == e.key) {
                    e.preventDefault();
                    if (!bAutorepeat) {
                        var sKey = (e.shift)?e.key.toUpperCase():e.key;
                        this._show(this.getAccentedChars(sKey), sKey);
                        bAutorepeat = !bAutorepeat;
                    }
                } else {
                    bKeydown = true;
                    sLastKey = e.key;
                    this.hide();
                }
            }.bind(this),
            "keyup": function(e) {
                bAutorepeat = false;
                bKeydown = false;
            }.bind(this)
        })
    },
    _navigate: function(e) {
        var oA = this.list.getElement("a." + this.oCss.h),
            aA = this.list.getElements("a"),
            oNext = null;

        switch (e.key) {
            case "left":
                oNext = aA[aA.indexOf(oA)-1]||aA.getLast();
                this._fnAlterClass(oNext, oA, this.oCss.h);
            break;
            case "right":
                oNext = aA[aA.indexOf(oA)+1]||aA[0];
                this._fnAlterClass(oNext, oA, this.oCss.h);
            break;
            default:
                this._populate(oA);
            break;
        }
    },
    /**
     * @param sKey (string) letter to search for
     */
    getAccentedChars: function(sKey) {
        return Object.filter(this.entitytable, function(key) {
            return key.charAt(0) == sKey;
        }, this);
    },
    hide: function() {
        if (this.list) {
            this.list.dispose();
            this.list = null;
        }
    },
    /**
     * @param oAdd (object) element to recieve sClass
     * @param mRemove (mixed) elements to remove sClass from
     * @param sClass (string) css class to add
     */
    _fnAlterClass: function(oAdd, mRemove, sClass) {
        mRemove.removeClass(sClass);
        oAdd.addClass(sClass);
    },
    /**
     * @param oEntities (object) associated list to loop over
     * @param sChar (string) key that was pressed
     */
    _show: function(oEntities, sChar) {
        this.hide();

        this.list = new Element("ul#accentedkeyboardcontainer", {
            "styles": {
                "top": this.element.getSize().y.toInt()
            }
        }).adopt(
            new Element("li").adopt(
                new Element("a", {
                    "href": "",
                    "html": sChar,
                    "class": this.oCss.h
                })
            )
        ).inject(this.container);

        Object.each(oEntities, function(key) {
            new Element("li").adopt(
                new Element("a", {
                    "href": "",
                    "html": "&"+key+";"
                })
            ).inject(this.list)
        }, this);

        this._addEvents();
    },
    _addEvents: function(e) {
        var aA = this.list.getElements("a");
        aA.each(function(oA) {
            oA.addEvents({
                "click": function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    this._populate(e);
                }.bind(this),
                "mouseover": function(e) {
                    this._fnAlterClass(e.target, aA, this.oCss.h);
                }.bind(this)
            })
        }, this)
    },
    _populate: function(e) {
        var oA = e.target||e;
        var iCaret = this.element.getCaretPosition();
        this.element.selectRange(iCaret-1, iCaret);
        this.element.insertAtCursor(oA.get("text"), false);
        this.hide();
    }
});
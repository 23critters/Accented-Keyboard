Accented Keyboard
=================

Accented Keyboard is a handy class for people using a different keyboard layout than the language they'd like to write with
Use left/right arrow key to move between letters, hit Enter or click with mouse button to select


![Screenshot](http://23c.se/Accented-Keyboard/screenshot.png)

How to use
-----------------

Javascript snippet to initialize the class:

    window.addEvent("domready", function(e) {
        new AccentedKeyboard({
            element: document.getElement("input.accented")
        })
    })


HTML snippet:

	<form>
    <fieldset>
        <input type="text" class="accented" />
    </fieldset>
    </form>

Options
-----------------

    element: (string||object) reference to select dom element container. if passing a string, supply it's id
    cssActions: (object) the names of the CSS classes used by the widget. Please change if you have conflicting CSS classes in your project. | default: {h: "hover", w: "wrapper"}
    wrapperTag: (string) tag name to wrap the input element | default: "div"


Methods
-----------------

The following methods are availible publicly:

    (object) getAccentedChars(string): return associated list for matching letters
    (void)   hide:                     hide the list element


Notes
-----------------

Version 1.0

	* First release

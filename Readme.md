# dom-paste

Retrieve the clipboard content as an `HTMLElement` on a `paste` event.

# Usage

`domPaste(event, callback)`

```javascript
var domPaste = require('dom-paste');

// ...

el.addEventListener('paste', function(e) { 
  domPaste(e, function(content) {
    // do something with content
  });
}, false)
```

Where `el` is a content-editable HTMLElement, and `content` is the returned `HTMLElement` containing the pasted content. The callback function is called asynchronously. 

# Implementation Details

A temporary contenteditable element is created, and the input focus is shifted to it. A `MutationObserver` is used to detect changes on the temporary element's DOM.
This temporary element is then passed to the callback. Due to the async nature of the `MutationObserver` API, the callback
is always fired asynchronously. The temporary element is kept in the document until the callback returns, so that `.getComputedStyle()` calls can be made on its contents.
After the callback returns, it's removed from the document automatically.

# Compability

|             |  OS X         |  Linux        |  Windows        |  Android       | iOS           |
|-------------|---------------|---------------|-----------------|----------------|---------------|
| Safari      | **OK**        | -             | -               | -              | Untested      |
| Chrome      | **OK**        | Untested      | Untested        | Untested       | Untested      |
| Firefox     | **Partial**   | Untested      | Untested        | Untested       | -             |
| Opera       | **OK**        | Untested      | Untested        | Untested       | -             |
| IE 11       | -             | -             | Untested        | -              | -             |
| IE 10       | -             | -             | Untested        | -              | -             |
| IE 9        | -             | -             | Untested        | -              | -             |

*More extensive compability info will be available soon*

# Remarks

* On Firefox for OS X pasting works but only results in plain text. This is actually a browser limitation/bug, and happens on all contenteditable text fields.
* The DOM structure produced by different browsers on paste varies wildly. This module does not attempt to do any sort of normalization.

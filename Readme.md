# dom-paste

Retrieve the clipboard content as a `DocumentFragment` on a `paste` event.

# Usage

`domPaste(event, callback)`

```javascript
var domPaste = require('dom-paste');

// ...

el.addEventListener('paste', function(e) { 
  domPaste(e, function(fragment) {
    // do something with fragment
  });
}, false)
```

Where `el` is a content-editable HTMLElement, and `fragment` is the returned `DocumentFragment` containing the pasted content. The callback function is called asynchronously. 

# Implementation Details

A temporary contenteditable element is created, and the input focus is shifted to it. A `MutationObserver` is used to detect changes on the temporary element's DOM.
It's contents are then extracted and placed into a `DocumentFragment`, which is passed to the callback. Due to the async nature of the `MutationObserver` API, the callback
is always fired asynchronously.

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

## Remarks

* On Firefox for OS X pasting works but only results in plain text. This is actually a browser limitation/bug, and happens on all contenteditable text fields.

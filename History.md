
2.0.1 / 2014-11-06
==================

  * Fix bug where we attempted to focus a text node. (This happened
    in Firefox under specific circumstances)
  * Use webmodules for Range/Selection functionality.

2.0.0 / 2014-10-27
==================

  * Switch to using `HTMLElement` instead of `DocumentFragment`,
    and delay the removal from the document until after the callback
    has returned, thus allowing for calls to getComputedStyle().

1.0.1 / 2014-10-23
==================

  * Actually include built `.js` file in published module.
  * Add .gitignore.
  * Add .npmignore.

1.0.0 / 2014-10-23
==================

  * Initial release.

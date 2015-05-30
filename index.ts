/// <reference path='types.d.ts' />

/**
 * Module dependencies.
 */

import setRange = require('selection-set-range');
import isBackward = require('selection-is-backward');
import currentRange = require('current-range');
import currentSelection = require('current-selection');

/**
 * DOM based "paste" event handler.
 *
 * @public
 */

function domPaste(e: Event, callback: (data: HTMLElement) => void) {

  // TODO: use `get-document` here
  var doc: Document = document;
  var selection: Selection = currentSelection(doc);
  var backward: boolean = isBackward(selection);
  var range: Range = currentRange(selection);
  var activeElement = <HTMLElement>doc.activeElement;

  // create temporary content editable contaner
  var container: HTMLElement = doc.createElement('div');
  container.contentEditable = 'true';
  container.style.position = 'fixed';
  container.style.overflow = 'hidden';
  container.style.width = container.style.height = container.style.top = container.style.left = '0px';

  var br: HTMLElement = doc.createElement('br'); // needed by Firefox
  container.appendChild(br);

  doc.body.appendChild(container);

  setTimeout(function() {
    // remove br element, if it's still there (Firefox fix)
    if (br.parentNode) {
      br.parentNode.removeChild(br);
    }

    // restore focus and original selection range
    activeElement.focus();
    if (range) {
      setRange(selection, range, backward);
    }

    try {
      callback(container);
    } finally {
      // remove temporary container
      doc.body.removeChild(container);
    }
  });

  // move focus and selection to temporary container
  container.focus();
  var selector: Range = doc.createRange();
  selector.selectNodeContents(container);
  setRange(selection, selector, false);

  // default paste behaviour will be handled by the browser inside the container,
  // triggering the mutation event.
}

export = domPaste;

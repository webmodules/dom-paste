
function domPaste(e: Event, callback: (data: DocumentFragment) => void) {

  // get selection object
  var selection = window.getSelection();

  // store original selection range
  var originalRange = (selection.rangeCount > 0) ? selection.getRangeAt(0) : null;

  // create temporary content editable contaner
  var container = document.createElement('div');
  container.contentEditable = 'true';
  var br = document.createElement('br'); // needed by Firefox
  container.appendChild(br);
  document.body.appendChild(container);

  // observer for dom mutations in container
  var observer = new MutationObserver(function() {
    // remove br element, if it's still there (Firefox fix)
    if (br.parentNode) {
      br.parentNode.removeChild(br);
    }

    // restore focus and original selection range
    (<HTMLElement>e.target).focus();
    if (originalRange) {
      selection.removeAllRanges();
      selection.addRange(originalRange);
    }

    // move content to a document fragment
    var fragment = document.createDocumentFragment();
    while (container.firstChild) {
      fragment.appendChild(container.firstChild);
    }

    try {
      callback(fragment);
    } finally {
      // stop observing and remove temporary container
      observer.disconnect();
      document.body.removeChild(container);
    }
  });

  observer.observe(container, {
    childList: true,
    attributes: true,
    characterData: true,
    subtree: true
  });

  // move focus and selection to temporary container
  container.focus();
  var range = document.createRange();
  range.selectNodeContents(container);
  selection.removeAllRanges();
  selection.addRange(range);

  // default paste behaviour will be handled by the browser inside the container,
  // triggering the mutation event.
}

export = domPaste;

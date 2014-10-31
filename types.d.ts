declare module "current-range" {
  function currentRange(doc: any): Range;
  export = currentRange;
}

declare module "current-selection" {
  function currentSelection(doc: any): Selection;
  export = currentSelection;
}

declare module "selection-is-backward" {
  function isBackward(selection: Selection): boolean;
  export = isBackward;
}

declare module "selection-set-range" {
  function setRange(selection: Selection, range: Range, backwards?: boolean): void;
  export = setRange;
}

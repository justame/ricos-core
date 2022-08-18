type ElementCoords = {
  top: number;
  left: number;
};

const getElementCoordsInWindow = (elem: HTMLElement): ElementCoords => {
  const box = elem.getBoundingClientRect();

  const body = document.body;
  const docEl = document.documentElement;

  const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  const clientTop = docEl.clientTop || body.clientTop || 0;
  const clientLeft = docEl.clientLeft || body.clientLeft || 0;

  const top = box.top + scrollTop - clientTop;
  const left = box.left + scrollLeft - clientLeft;

  return { top: Math.round(top), left: Math.round(left) };
};

const getElementCoordsInWindowByBoundingClientRect = (elem: HTMLElement): ElementCoords => {
  const { top, left } = elem.getBoundingClientRect();
  return { top: Math.round(top), left: Math.round(left) };
};

export const elementOverflowWithEditor = (
  element: HTMLElement,
  rootEditorElement?: HTMLElement,
  modalOverflowByBoundingClientRect?: boolean
): Record<string, number> => {
  const elementCoordsInWindow = modalOverflowByBoundingClientRect
    ? getElementCoordsInWindowByBoundingClientRect(element)
    : getElementCoordsInWindow(element);
  const elementOffsetLeft = elementCoordsInWindow.left;
  const elementOffsetTop = elementCoordsInWindow.top;
  const elementWidth = element.clientWidth;
  const elementHeight = element.clientHeight;
  const rootEditor =
    rootEditorElement || (element.closest('[data-hook=root-editor]') as HTMLElement);
  if (rootEditor) {
    const rootEditorCoordsInWindow =
      rootEditor && modalOverflowByBoundingClientRect
        ? getElementCoordsInWindowByBoundingClientRect(rootEditor)
        : getElementCoordsInWindow(rootEditor);
    const rootEditorOffsetLeft = rootEditorCoordsInWindow.left;
    const rootEditorOffsetTop = rootEditorCoordsInWindow.top;
    const editorWidth = (rootEditor && rootEditor.getBoundingClientRect().width) || 999999;
    const editorHeight = (rootEditor && rootEditor.getBoundingClientRect().height) || 999999;
    const overflowRight = elementWidth + (elementOffsetLeft - rootEditorOffsetLeft) - editorWidth;
    const overflowBottom = elementHeight + (elementOffsetTop - rootEditorOffsetTop) - editorHeight;
    return {
      overflowRight: overflowRight > 0 ? overflowRight : 0,
      overflowBottom:
        overflowBottom > 0 && elementOffsetTop - elementHeight > 0 ? overflowBottom : 0,
    };
  } else {
    return {
      overflowRight: 0,
      overflowBottom: 0,
    };
  }
};

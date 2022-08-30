export const getContentHeight = (
  layoutMap,
  focusedField,
  safeMarginContentHeight,
  hasArea,
) => {
  if (hasArea) {
    return Object.values(layoutMap).filter(view => view.isArea)[0]?.height;
  }

  return layoutMap[Object.keys(layoutMap).length - 1]?.y -
    layoutMap[focusedField]?.y +
    layoutMap[Object.keys(layoutMap).length - 1]?.height +
    safeMarginContentHeight
};

export const getItemPosition = (
  alignTo,
  doesFitScreen,
  layoutMap,
  focusedField,
  hasArea,
) => {
  if (hasArea) {
    return Object.values(layoutMap).filter(view => view.isArea)[0]?.y +
    Object.values(layoutMap).filter(view => view.isArea)[0]?.height || 0;
  }

  if (alignTo === 'bottom' && doesFitScreen) {
    return layoutMap[Object.keys(layoutMap).length - 1]?.y +
    layoutMap[Object.keys(layoutMap).length - 1]?.height || 0;
  }

  if (alignTo === 'input' || !doesFitScreen) {
    return layoutMap[focusedField]?.y +
    layoutMap[focusedField]?.height || 0;
  }
};

export const checkScreenFit = (
  safeAreaScreenHeight,
  contentHeight,
) => {
  if (safeAreaScreenHeight < contentHeight) {
    return false;
  }

  return true;
}
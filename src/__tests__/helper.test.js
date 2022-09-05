import { getContentHeight, getItemPosition, checkScreenFit } from '../helper';

const MockLayoutMapWithArea = {
  0: {y: 0,height: 600,isArea: undefined},
  1: {y: 600,height: 150,isArea: true},
  2: {y: 750,height: 500,isArea: undefined},
};

const MockLayoutMapWithoutArea = {
  0: {y: 0, height: 600, isArea: undefined},
  1: {y: 600, height: 45, isArea: undefined},
  2: {y: 645, height: 20, isArea: undefined},
  3: {y: 665, height: 45, isArea: undefined},
  4: {y: 710, height: 20, isArea: undefined},
  5: {y: 730, height: 40, isArea: undefined},
  6: {y: 770, height: 500, isArea: undefined},
}

const MockFocusedField = 1;

const MockSafeMarginContentHeight = 70;

describe('Avoidable helper', () => {
  describe('getContentHeight', () => {
    test('Get Content Height without Area', () => {
      expect(getContentHeight(
        MockLayoutMapWithoutArea,
        MockFocusedField,
        MockSafeMarginContentHeight,
        false,
      )).toEqual(740);
    });

    test('Get Content Height with Area', () => {
      expect(getContentHeight(
        MockLayoutMapWithArea,
        MockFocusedField,
        MockSafeMarginContentHeight,
        true,
      )).toEqual(150);
    });
  })

  describe('getItemPosition', () => {
    test('Get Item Position with Area and AlignTo Bottom', () => {
      expect(getItemPosition(
        'bottom',
        true,
        MockLayoutMapWithArea,
        MockFocusedField,
        true,
      )).toEqual(750);
    });

    test('Get Item Position with Area and AlignTo Input', () => {
      expect(getItemPosition(
        'input',
        true,
        MockLayoutMapWithArea,
        MockFocusedField,
        true,
      )).toEqual(750);
    });

    test('Get Item Position with AlignTo Bottom', () => {
      expect(getItemPosition(
        'bottom',
        true,
        MockLayoutMapWithoutArea,
        MockFocusedField,
        false,
      )).toEqual(1270);
    });

    test('Get Item Position with AlignTo Input', () => {
      expect(getItemPosition(
        'input',
        true,
        MockLayoutMapWithoutArea,
        MockFocusedField,
        false,
      )).toEqual(645);
    });

    test('Get Item Position with AlignTo Bottom but does not fit screen', () => {
      expect(getItemPosition(
        'input',
        false,
        MockLayoutMapWithoutArea,
        MockFocusedField,
        true,
      )).toEqual(0);
    });
  });

  describe('checkScreenFit', () => {
    test('Check if content fits screen', () => {
      expect(checkScreenFit(
        508,
        240,
      )).toBeTruthy();
    });

    test('Check if content does not fit screen', () => {
      expect(checkScreenFit(
        508,
        600,
      )).toBeFalsy();
    });
  })
})
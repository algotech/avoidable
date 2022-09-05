import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  Platform,
  Keyboard,
  ScrollView,
  View,
  LayoutAnimation,
  StyleSheet,
} from 'react-native';
import { useSafeAreaFrame } from 'react-native-safe-area-context';

import { getContentHeight, getItemPosition, checkScreenFit } from './helper';

const SAFE_MARGIN_CONTENT_HEIGHT = 70;
const SAFE_MARGIN_SCROLLVIEW_BOTTOM = 0;
const KEYBOARD_OPEN_EVENTS = [
  'keyboardWillShow',
  'keyboardWillChangeFrame',
  'keyboardDidShow',
];

const KEYBOARD_CLOSE_EVENTS = [
  'keyboardWillHide',
  'keyboardDidHide',
];

const { height: screenHeight } = Dimensions.get('window');

const Avoidable = ({
  alignTo = 'input',
  children,
  containerStyle,
  contextAware = true,
  keyboardHiddenContainerStyle,
  safeMarginBottom = SAFE_MARGIN_SCROLLVIEW_BOTTOM,
  safeMarginContentHeight = SAFE_MARGIN_CONTENT_HEIGHT,
  scrollViewProps,
}) => {
  const [keyboardHeight, setKeyboardHeight] = React.useState(0);
  const [keyboardUp, setKeyboardUp] = React.useState(false);
  const [focusedField, setFocusedField] = React.useState();
  const [layoutMap, setLayoutMap] = React.useState({});
  const [contentOffset, setContentOffset] = React.useState(0);
  let subscriptions = [];
  const { height: safeAreaHeight } = useSafeAreaFrame();

  if (!children && __DEV__) {
    throw new Error('Please add at least one child to Avoidable.');
  }

  const getKeyboardHeight = (e) => {
    if (keyboardHeight > 0) {
      setKeyboardHeight(0);
    }

    if (!keyboardHeight) {
      setKeyboardHeight(e.endCoordinates?.height);
    }
  };

  React.useEffect(() => {
    KEYBOARD_OPEN_EVENTS.forEach((event) => {
      subscriptions = [...subscriptions,
        Keyboard.addListener(event, (e) => {
          getKeyboardHeight(e);
          setKeyboardUp(true);
        })];
    });
    KEYBOARD_CLOSE_EVENTS.forEach((event) => {
      subscriptions = [...subscriptions,
        Keyboard.addListener(event, (e) => {
          getKeyboardHeight(e);
          setKeyboardUp(false);
        })];
    });

    return () => {
      subscriptions.forEach((subscription) => subscription.remove());
    };
  }, []);

  React.useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [keyboardUp, focusedField]);

  const getStyles = () => {
    const hasArea = Object.values(layoutMap).some(view => view.isArea);
        
    if (hasArea && (alignTo !== 'bottom' || !contextAware) && __DEV__) {
      console.warn(`When Area is used, alignTo must be "bottom" and contextAware must be true.`);
    }

    const contentHeight = getContentHeight(
        layoutMap,
        focusedField,
        safeMarginContentHeight,
        hasArea
      );
    const safeAreaScreenHeight = Platform.OS === 'ios' ?
      screenHeight - keyboardHeight :
      safeAreaHeight;
    const doesFitScreen = checkScreenFit(
        safeAreaScreenHeight,
        contentHeight,
      );
    const itemPosition = getItemPosition(
        alignTo,
        doesFitScreen,
        layoutMap,
        focusedField,
        hasArea
      );
    let shouldMove = !contextAware;

    if (itemPosition + safeMarginBottom - contentOffset > safeAreaScreenHeight) {
      shouldMove = true;
    }

    if (keyboardUp && shouldMove) {
      return StyleSheet.create({
        width: '100%',
        minHeight: safeAreaScreenHeight,
        ...Platform.select({
          ios: {
            top:
              contentOffset +
              screenHeight -
              keyboardHeight -
              safeMarginBottom -
              itemPosition,
          },
          android: {
            top:
              contentOffset +
              safeAreaHeight -
              safeMarginBottom -
              itemPosition,
          },
        }),
      });
    }

    return StyleSheet.create({
      ...keyboardHiddenContainerStyle,
    });
  };

  return (
    <View>
      <ScrollView
        overScrollMode="never"
        scrollToOverflowEnabled={false}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          ...containerStyle,
          ...getStyles(),
        }}
        scrollEventThrottle={1}
        keyboardDismissMode={Platform.select({
          ios: 'interactive',
          android: 'on-drag',
        })}
        onScroll={(e) => {
          setContentOffset(e.nativeEvent.contentOffset.y);
        }}
        {...scrollViewProps}
      >
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) {
            return false;
          }

          const itemKey = index;

          return (
            <View
              onLayout={(e) => {
                setLayoutMap({
                  ...layoutMap,
                  [itemKey]: {
                    y: e.nativeEvent.layout.y,
                    height: e.nativeEvent.layout.height,
                    isArea: child.type.isAvoidable,
                  },
                });
              }}
              onFocus={() => {
                setFocusedField(itemKey);
              }}
              style={child.props.style}
            >
              {child}
            </View>
          );
        })}

      </ScrollView>
    </View>
  );
};

Avoidable.propTypes = {
  children: PropTypes.array.isRequired,
  containerStyle: PropTypes.object,
  alignTo: PropTypes.oneOf(['input', 'bottom']),
  scrollViewProps: PropTypes.object,
  contextAware: PropTypes.bool,
};

export { Avoidable };

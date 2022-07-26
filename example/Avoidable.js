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

let contentOffset = 0;
const AVOIDABLE_APP_SPACING = 12;
const SAFE_MARGIN_CONTENT_HEIGHT = 70;
const SAFE_MARGIN_SCROLLVIEW_BOTTOM = 60;
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
  children,
  containerStyle,
  focusTo = 'input',
  scrollViewProps,
  appSpacing = AVOIDABLE_APP_SPACING,
  safeMarginContentHeight = SAFE_MARGIN_CONTENT_HEIGHT,
  safeMarginBottom = SAFE_MARGIN_SCROLLVIEW_BOTTOM
}) => {
  const [keyboardHeight, setKeyboardHeight] = React.useState(0);
  const [keyboardUp, setKeyboardUp] = React.useState(false);
  const [focusedField, setFocusedField] = React.useState();
  const [layoutMap, setLayoutMap] = React.useState({});
  let subscriptions = [];
  const { height: safeAreaHeight } = useSafeAreaFrame();

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
    let itemPosition = 0;
    let doesFitScreen = true;
    const safeAreaScreenHeight = Platform.OS === 'ios' ?
      screenHeight - keyboardHeight :
      safeAreaHeight;
    const contentHeight = layoutMap[Object.keys(layoutMap).length - 1]?.y -
      layoutMap[focusedField]?.y +
      layoutMap[Object.keys(layoutMap).length - 1]?.height +
      safeMarginContentHeight;

    if (safeAreaScreenHeight < contentHeight) {
      doesFitScreen = false;
    }

    if (focusTo === 'bottom' || doesFitScreen) {
      itemPosition = layoutMap[Object.keys(layoutMap).length - 1]?.y +
      layoutMap[Object.keys(layoutMap).length - 1]?.height || 0;
      contentOffset = 0;
    }

    if (focusTo === 'input' || !doesFitScreen) {
      itemPosition = layoutMap[focusedField]?.y +
      layoutMap[focusedField]?.height || 0;
    }

    if (keyboardUp) {
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
      height: doesFitScreen ? screenHeight - appSpacing * 2 : null,
      minHeight: doesFitScreen ?
        null :
        screenHeight - appSpacing * 2,
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
          contentOffset = e.nativeEvent.contentOffset.y;
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
  focusTo: PropTypes.oneOf(['input', 'bottom']),
  scrollViewProps: PropTypes.object,
};

export default Avoidable;

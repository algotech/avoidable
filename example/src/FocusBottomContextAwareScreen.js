import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

import Avoidable from '../Avoidable';
import Button from './Button';

export default function FocusInputContextAwareScreen() {
  return (
    <View style={styles.container} >
      <Button back />
      <Avoidable
        focusTo="bottom"
        contextAware={true}
        // safeMarginBottom={-980}
      >
          <View style={styles.spacer.big.top} />
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            returnKeyType="next"
            placeholderTextColor="#aaa"
            style={styles.input}
          />
          <View style={styles.spacer.small} />
          <TextInput
            placeholder="Password"
            keyboardType="email-address"
            returnKeyType="next"
            placeholderTextColor="#aaa"
            style={styles.input}
          />
          <View style={styles.spacer.small} />
          <Button
            title="Log In"
            style={styles.button}
            color="white"
          />
          <View style={{height: 300, backgroundColor: 'black'}} />
          {/* <View style={styles.spacer.big.bottom} /> */}
          {/* <View style={styles.spacer.big.bottom} /> */}
          {/* <View style={styles.spacer.big.bottom} /> */}
          {/* <View style={styles.spacer.big.bottom} /> */}
      </Avoidable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  spacer: {
    paddingTop: 50,
    small: {
      paddingTop: 10,
    },
    big: {
      top: {
        paddingTop: 300,
      },
      bottom: {
        paddingTop: 250,
      },
    },
    
  },
  input: {
    backgroundColor: 'white',
    width: 300,
    height: 45,
    borderRadius: 13,
    textAlign: "center"
  },
});

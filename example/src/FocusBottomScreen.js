import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Avoidable } from '@algotech-software/avoidable';

// import Avoidable from '../Avoidable';
import Button from './Button';

export default function FocusBottomScreen() {
  return (
    <View style={styles.container} >
      <Button back />
      <Avoidable
        alignTo="bottom"  
        contextAware={false}
        safeMarginBottom={10}
      >
        <View style={styles.spacer} />
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
  },
  input: {
    backgroundColor: 'white',
    width: 300,
    height: 45,
    borderRadius: 13,
    textAlign: "center"
  },
});

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

import Avoidable from '../Avoidable';

export default function Screen() {
  return (
    <View style={styles.container} >
      <Avoidable
        focusTo="input"
        contextAware={true}
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
            placeholder="Email"
            keyboardType="email-address"
            returnKeyType="next"
            placeholderTextColor="#aaa"
            style={styles.input}
          />
          <View style={styles.spacer.small} />
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
          <TextInput
            placeholder="Password"
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
          <TextInput
            placeholder="Password"
            keyboardType="email-address"
            returnKeyType="next"
            placeholderTextColor="#aaa"
            style={styles.input}
          />
          <View style={styles.spacer.small} />
          <View style={{flex: 0.8}} />
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
  button: {
    width: 300,
    height: 40,
    borderRadius: 13,
    backgroundColor: 'darkred',
    textColor: 'white'
  }
});

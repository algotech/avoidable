import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Button from './Button';

import {
  FOCUSBOTTOMCONTEXTAWARESCREEN,
  FOCUSBOTTOMSCREEN,
  FOCUSINPUTCONTEXTAWARESCREEN,
  FOCUSINPUTSCREEN,
  // FOCUSBOTTOMDISTANCETOBOTTOM,
} from '../routeNames';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    padding: 30,
  },
  spacer: {
    paddingTop: 50,
    small: {
      paddingTop: 15,
    },
  },
});

const MainScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Button
        title="Focus to input"
        onPress={() => navigation.navigate(FOCUSINPUTSCREEN)}
      />
      <View style={styles.spacer.small} />
      <Button
        title="Focus to input - Context Aware"
        onPress={() => navigation.navigate(FOCUSINPUTCONTEXTAWARESCREEN)}
      />
      <View style={styles.spacer.small} />
      <Button
        title="Focus to bottom"
        onPress={() => navigation.navigate(FOCUSBOTTOMSCREEN)}
      />
      <View style={styles.spacer.small} />
      <Button
        title="Focus to bottom - Context Aware"
        onPress={() => navigation.navigate(FOCUSBOTTOMCONTEXTAWARESCREEN)}
      />
      {/* TODO:  */}
      {/* To be implemented later */}
      {/* <View style={styles.spacer} />
      <Text>--- Other examples ---</Text>
      <View style={styles.spacer} />
      <Button
        title="Focus to bottom - Distance to button"
        onPress={() => navigation.navigate(FOCUSBOTTOMDISTANCETOBOTTOM)}
        type="other"
      /> */}
    </View>
  );
};

export default MainScreen;
